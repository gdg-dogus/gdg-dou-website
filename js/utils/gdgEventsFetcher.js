import { apiEventOverrides, events as fallbackEvents } from '../data/eventsData.js';

const API_BASE = 'https://gdg.community.dev/api/event_slim/for_chapter/2744/';
const EVENT_TIME_ZONE = 'Europe/Istanbul';
const CACHE_KEY = 'gdg-dou-community-events-v2';
const CACHE_DURATION = 30 * 60 * 1000;
const PAGE_SIZE = 100;

const EVENT_FIELDS = [
    'id',
    'title',
    'start_date',
    'end_date',
    'event_timezone',
    'timezone_abbreviation',
    'event_type_title',
    'cropped_picture_url',
    'cropped_banner_url',
    'url',
    'static_url',
    'cohost_registration_url',
    'description',
    'description_short',
    'venue_name',
    'venue_address',
    'venue_city'
].join(',');

function buildApiUrl(status, order) {
    const params = new URLSearchParams({
        page_size: String(PAGE_SIZE),
        status,
        include_cohosted_events: 'true',
        visible_on_parent_chapter_only: 'true',
        order,
        fields: EVENT_FIELDS,
        page: '1'
    });

    return `${API_BASE}?${params.toString()}`;
}

function readCache() {
    try {
        const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null');
        if (!cached || !Array.isArray(cached.events)) return null;
        if (Date.now() - cached.timestamp > CACHE_DURATION) return null;
        return cached.events;
    } catch (error) {
        return null;
    }
}

function writeCache(events) {
    try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({
            timestamp: Date.now(),
            events
        }));
    } catch (error) {
        // Storage can be disabled in private browsing modes. Fetching still works.
    }
}

function decodeHtml(text) {
    if (!text) return '';

    if (typeof document !== 'undefined') {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = text;
        return textarea.value;
    }

    return text
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
}

function stripHtml(html) {
    if (!html) return '';

    if (typeof DOMParser !== 'undefined') {
        const doc = new DOMParser().parseFromString(html, 'text/html');
        return (doc.body.textContent || '').replace(/\s+/g, ' ').trim();
    }

    return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function toPlainText(value) {
    return decodeHtml(stripHtml(String(value || ''))).trim();
}

function getIstanbulDateTime(startDate) {
    const date = new Date(startDate);
    if (Number.isNaN(date.getTime())) {
        return { date: '', time: '' };
    }

    const parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: EVENT_TIME_ZONE,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).formatToParts(date).reduce((acc, part) => {
        acc[part.type] = part.value;
        return acc;
    }, {});

    return {
        date: `${parts.year}-${parts.month}-${parts.day}`,
        time: `${parts.hour}:${parts.minute}`
    };
}

function mapCategory(event) {
    const title = String(event.title || '').toLocaleLowerCase('tr-TR');
    if (title.includes('gezi') || title.includes('trip') || title.includes('tour')) {
        return 'trip';
    }

    const type = String(event.event_type_title || '').toLocaleLowerCase('en-US');
    if (type.includes('conference')) return 'summit';
    if (type.includes('workshop') || type.includes('study')) return 'workshop';
    if (type.includes('info')) return 'info_session';
    if (type.includes('speaker') || type.includes('talk') || type.includes('meetup')) return 'tech_talk';

    return 'tech_talk';
}

function buildLocation(event) {
    const parts = [event.venue_name, event.venue_address, event.venue_city]
        .map(toPlainText)
        .filter(Boolean);

    return parts.length ? parts.join(', ') : 'GDG Community';
}

function mergeI18n(baseI18n = {}, overrideI18n = {}) {
    const languages = new Set([
        ...Object.keys(baseI18n || {}),
        ...Object.keys(overrideI18n || {})
    ]);

    return Array.from(languages).reduce((merged, lang) => {
        merged[lang] = {
            ...(baseI18n?.[lang] || {}),
            ...(overrideI18n?.[lang] || {})
        };
        return merged;
    }, {});
}

function appendLocationSuffix(location, suffix) {
    const cleanLocation = String(location || '').trim();
    const cleanSuffix = String(suffix || '').trim();
    if (!cleanSuffix) return cleanLocation;
    if (!cleanLocation) return cleanSuffix;
    if (cleanLocation.includes(cleanSuffix)) return cleanLocation;
    return `${cleanLocation}, ${cleanSuffix}`;
}

function applyApiEventOverride(event) {
    const override = apiEventOverrides?.[String(event.sourceId || '')];
    if (!override) return event;
    const { fallbackSlug, locationSuffix, i18n, ...overrideFields } = override;

    const mergedEvent = {
        ...event,
        ...overrideFields,
        i18n: mergeI18n(event.i18n, i18n)
    };

    if (locationSuffix && !overrideFields.location) {
        mergedEvent.location = appendLocationSuffix(event.location, locationSuffix);
    }

    return mergedEvent;
}

function applyApiEventOverrides(events) {
    return events.map(event => event?.source === 'gdg-community' ? applyApiEventOverride(event) : event);
}

function getLocalOnlyEvents() {
    const overriddenFallbackSlugs = new Set(
        Object.values(apiEventOverrides || {})
            .map(override => override?.fallbackSlug)
            .filter(Boolean)
    );

    return fallbackEvents.filter(event => !overriddenFallbackSlugs.has(event.slug));
}

function normalizeEvent(event, timeStatus) {
    const startDateTime = getIstanbulDateTime(event.start_date);
    const endDateTime = getIstanbulDateTime(event.end_date);
    const fullDescription = toPlainText(event.description);
    const shortDescription = toPlainText(event.description_short) || fullDescription;

    return {
        id: `gdg-${event.id}`,
        sourceId: event.id,
        source: 'gdg-community',
        timeStatus,
        slug: `gdg-${event.id}`,
        title: toPlainText(event.title) || 'GDG Event',
        shortTitle: toPlainText(event.title) || 'GDG Event',
        date: startDateTime.date,
        time: startDateTime.time,
        endDate: endDateTime.date,
        endTime: endDateTime.time,
        timezone: event.event_timezone || EVENT_TIME_ZONE,
        timezoneLabel: event.timezone_abbreviation || 'GMT+3',
        startDate: event.start_date,
        endDateRaw: event.end_date,
        location: buildLocation(event),
        description: fullDescription || shortDescription || 'GDG Community event details will be available on the official event page.',
        shortDescription,
        category: mapCategory(event),
        image: event.cropped_picture_url || event.cropped_banner_url || '',
        registrationUrl: event.cohost_registration_url || event.url || event.static_url,
        url: event.url || event.static_url
    };
}

async function fetchEventsByStatus(status, order, timeStatus) {
    const response = await fetch(buildApiUrl(status, order), {
        headers: {
            Accept: 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`GDG events fetch failed: ${response.status}`);
    }

    const data = await response.json();
    if (!Array.isArray(data.results)) {
        throw new Error('Invalid GDG events response');
    }

    return data.results.map(event => normalizeEvent(event, timeStatus));
}

export async function loadGdgEvents({ forceRefresh = false } = {}) {
    if (!forceRefresh) {
        const cachedEvents = readCache();
        if (cachedEvents) return [...applyApiEventOverrides(cachedEvents), ...getLocalOnlyEvents()];
    }

    try {
        const [upcomingEvents, pastEvents] = await Promise.all([
            fetchEventsByStatus('Live', 'start_date', 'upcoming'),
            fetchEventsByStatus('Completed', '-start_date', 'past')
        ]);

        const events = [...upcomingEvents, ...pastEvents];
        writeCache(events);
        return [...applyApiEventOverrides(events), ...getLocalOnlyEvents()];
    } catch (error) {
        console.warn('Using local event data fallback because GDG Community events could not be loaded.', error);
        return fallbackEvents;
    }
}
