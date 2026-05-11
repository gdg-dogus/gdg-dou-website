import { loadGdgEvents } from '../utils/gdgEventsFetcher.js';
import { getLocale, getLocalizedItem, t } from '../translations.js';

let currentCategory = 'all';
let currentTimeFilter = 'upcoming';
let activeEventId = null;
let events = [];
let previousBodyOverflow = '';
const eventUrlParam = 'eventId';
const initialVisibleEvents = 6;
const visibleEventsIncrement = 6;
let visibleEventsLimit = initialVisibleEvents;

const categoryConfig = {
    summit: {
        color: 'var(--gdg-blue)',
        colorHex: '#4285F4',
        bgColor: 'var(--gdg-blue-ambient)',
        icon: 'emoji_events',
        labelKey: 'eventsPage.category.summit'
    },
    tech_talk: {
        color: 'var(--gdg-green)',
        colorHex: '#34A853',
        bgColor: 'var(--gdg-green-ambient)',
        icon: 'mic',
        labelKey: 'eventsPage.category.tech_talk'
    },
    workshop: {
        color: 'var(--gdg-yellow)',
        colorHex: '#FBBC04',
        bgColor: 'var(--gdg-yellow-ambient)',
        icon: 'construction',
        labelKey: 'eventsPage.category.workshop'
    },
    trip:{ 
        color: 'var(--gdg-red)',
        colorHex: '#EE352E',
        bgColor: 'var(--gdg-red-ambient)',
        icon: 'directions_bus',
        labelKey: 'eventsPage.category.trip'
    },
    info_session: {
        color: 'var(--gdg-blue)',
        colorHex: '#4285F4',
        bgColor: 'var(--gdg-blue-ambient)',
        icon: 'info',
        labelKey: 'eventsPage.category.info_session'
    },
    design: {
        color: 'var(--gdg-blue)',
        colorHex: '#4285F4',
        bgColor: 'var(--gdg-blue-ambient)',
        icon: 'palette',
        labelKey: 'eventsPage.category.design'
    }
};

function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function parseLocalDate(dateString) {
    const [year, month, day] = String(dateString || '').split('-').map(Number);
    if (!year || !month || !day) return new Date(dateString);
    return new Date(year, month - 1, day);
}

function getSortableDate(event) {
    if (event?.startDate) return new Date(event.startDate);
    return new Date(`${event.date}T${event.time || '00:00'}`);
}

function getEventTimeStatus(event) {
    if (event?.timeStatus) return event.timeStatus;
    return isUpcoming(event?.date) ? 'upcoming' : 'past';
}

function formatDate(dateString) {
    const date = parseLocalDate(dateString);
    const locale = getLocale();
    return {
        day: date.getDate(),
        month: date.toLocaleDateString(locale, { month: 'short' }),
        year: date.getFullYear(),
        full: date.toLocaleDateString(locale, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    };
}

function hasCapacity(event) {
    return Number.isFinite(Number(event?.spots)) &&
        Number.isFinite(Number(event?.registered)) &&
        Number(event.spots) > 0;
}

function getCapacityInfo(event) {
    if (!hasCapacity(event)) {
        return {
            hasCapacity: false,
            spotsLeft: null,
            progress: 0
        };
    }

    const spots = Number(event.spots);
    const registered = Number(event.registered);
    return {
        hasCapacity: true,
        spotsLeft: Math.max(spots - registered, 0),
        progress: Math.min((registered / spots) * 100, 100)
    };
}

function isUpcoming(dateString) {
    const eventDate = parseLocalDate(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate >= today;
}

function getEventTimezoneLabel(event) {
    const label = event?.timezoneLabel || '';
    if (!label) return 'GMT+3';
    if (String(label).startsWith('+')) return `GMT${label}`;
    return label;
}

function getEventTimeDetails(event) {
    const startDate = formatDate(event.date);
    const endDate = event.endDate ? formatDate(event.endDate) : null;
    const sameDay = !event.endDate || event.endDate === event.date;

    return {
        day: startDate.full,
        start: `${event.time || '--:--'} ${getEventTimezoneLabel(event)}`,
        end: event.endTime
            ? `${event.endTime} ${sameDay ? '' : endDate.full + ' '}${getEventTimezoneLabel(event)}`.trim()
            : t('eventsPage.timeUnavailable')
    };
}

function getEventTimeRangeText(event) {
    if (!event?.time) return '';
    return event.endTime ? `${event.time} - ${event.endTime}` : event.time;
}

function getMapEmbedUrl(location) {
    return `https://www.google.com/maps?q=${encodeURIComponent(location || 'Doğuş Üniversitesi Dudullu Kampüsü')}&output=embed`;
}

function getCardDescription(event, localizedEvent) {
    return localizedEvent.shortDescription || event.shortDescription || localizedEvent.description || '';
}

function getEventUrlId(event) {
    return event?.slug || event?.id || '';
}

function getEventUrl(event) {
    const url = new URL(window.location.href);
    url.searchParams.set(eventUrlParam, getEventUrlId(event));
    return url.toString();
}

function setEventUrl(event) {
    const nextUrl = getEventUrl(event);
    if (nextUrl !== window.location.href) {
        history.pushState({ eventId: getEventUrlId(event) }, '', nextUrl);
    }
}

function clearEventUrl() {
    const url = new URL(window.location.href);
    if (!url.searchParams.has(eventUrlParam)) return;

    url.searchParams.delete(eventUrlParam);
    history.pushState({}, '', url.toString());
}

function findEventByUrlId(eventUrlId) {
    if (!eventUrlId) return null;

    return events.find(event => {
        const urlId = getEventUrlId(event);
        const sourceId = event?.sourceId ? String(event.sourceId) : '';
        return event.id === eventUrlId ||
            event.slug === eventUrlId ||
            urlId === eventUrlId ||
            (sourceId && eventUrlId === sourceId) ||
            (sourceId && eventUrlId === `gdg-${sourceId}`);
    }) || null;
}

function getEventApplicationUrl(event) {
    return event?.applicationUrl || event?.registrationUrl || event?.url || '';
}

function getApplicationState(event, capacity, localizedEvent = getLocalizedItem(event)) {
    const upcoming = getEventTimeStatus(event) === 'upcoming';
    const full = capacity.hasCapacity && capacity.spotsLeft === 0;
    const manuallyClosed = event?.applicationsOpen === false;
    const applicationUrl = getEventApplicationUrl(event);
    const canApply = upcoming && !full && !manuallyClosed && Boolean(applicationUrl);

    if (!upcoming) {
        return {
            canApply: false,
            url: '',
            icon: 'event_busy',
            cardLabel: t('eventsPage.completed'),
            buttonLabel: t('eventsPage.eventCompleted'),
            note: t('eventsPage.registrationNotePast')
        };
    }

    if (full) {
        return {
            canApply: false,
            url: '',
            icon: 'schedule',
            cardLabel: t('eventsPage.full'),
            buttonLabel: t('eventsPage.waitlist'),
            note: t('eventsPage.registrationNoteClosed')
        };
    }

    if (manuallyClosed || !applicationUrl) {
        return {
            canApply: false,
            url: '',
            icon: 'lock',
            cardLabel: t('eventsPage.applicationsClosed'),
            buttonLabel: t('eventsPage.applicationsClosed'),
            note: t('eventsPage.registrationNoteClosed')
        };
    }

    return {
        canApply,
        url: applicationUrl,
        icon: 'person_add',
        cardLabel: localizedEvent.applicationLabel || t('eventsPage.register'),
        buttonLabel: localizedEvent.applicationLabel || t('eventsPage.registerNow'),
        note: t('eventsPage.registrationNoteUpcoming')
    };
}

function createEventCard(event) {
    const localizedEvent = getLocalizedItem(event);
    const config = categoryConfig[event.category] || categoryConfig.tech_talk;
    const categoryLabel = t(config.labelKey);
    const dateInfo = formatDate(event.date);
    const upcoming = getEventTimeStatus(event) === 'upcoming';
    const capacity = getCapacityInfo(event);
    const applicationState = getApplicationState(event, capacity, localizedEvent);

    const eventCard = document.createElement('article');
    eventCard.className = `event-card ${upcoming ? 'upcoming' : 'past'} category-${event.category}`;
    eventCard.setAttribute('data-category', event.category);
    eventCard.setAttribute('data-date', event.date);
    eventCard.setAttribute('data-event-id', event.id);
    eventCard.setAttribute('data-event-url-id', getEventUrlId(event));
    eventCard.style.cursor = 'pointer';

    eventCard.innerHTML = `
        <div class="event-card-inner">
            <div class="event-image-wrapper">
                ${event.image ? `<img src="${escapeHtml(event.image)}" alt="${escapeHtml(localizedEvent.title)}" class="event-image" loading="lazy">` : ''}
                <div class="event-image-overlay"></div>
                <div class="event-date-badge">
                    <span class="date-day">${dateInfo.day}</span>
                    <span class="date-month">${dateInfo.month}</span>
                </div>
                <div class="event-category-badge" style="background: ${config.color};">
                    <span class="material-symbols-outlined">${config.icon}</span>
                    ${escapeHtml(categoryLabel)}
                </div>
            </div>
            
            <div class="event-content">
                <h3 class="event-title">${escapeHtml(localizedEvent.title)}</h3>
                
                <div class="event-meta">
                    <div class="meta-item">
                        <span class="material-symbols-outlined">schedule</span>
                        <span>${escapeHtml(getEventTimeRangeText(event))}</span>
                    </div>
                    <div class="meta-item">
                        <span class="material-symbols-outlined">location_on</span>
                        <span>${escapeHtml(localizedEvent.location)}</span>
                    </div>
                </div>
                
                <p class="event-description">${escapeHtml(getCardDescription(event, localizedEvent))}</p>
                
                ${localizedEvent.speakers && localizedEvent.speakers.length > 0 ? `
                    <div class="event-speakers">
                        <span class="material-symbols-outlined">person</span>
                        <span>${escapeHtml(localizedEvent.speakers.slice(0, 2).join(', '))}${localizedEvent.speakers.length > 2 ? ` +${localizedEvent.speakers.length - 2}` : ''}</span>
                    </div>
                ` : ''}
                
                <div class="event-footer">
                    ${capacity.hasCapacity ? `
                        <div class="event-capacity">
                            <div class="capacity-bar">
                                <div class="capacity-fill" style="width: ${capacity.progress}%; background: ${config.color};"></div>
                            </div>
                        </div>
                    ` : ''}
                    <div class="event-footer-bottom">
                        ${capacity.hasCapacity ? `
                            <span class="capacity-text">${escapeHtml(capacity.spotsLeft > 0 ? t('eventsPage.spotsLeft', { count: capacity.spotsLeft }) : t('eventsPage.full'))}</span>
                        ` : ''}

                        ${upcoming ? `
                            ${capacity.hasCapacity ? '<span class="register-separator" aria-hidden="true"></span>' : ''}
                            <button type="button" class="btn btn-outline event-register" ${applicationState.canApply ? '' : 'disabled'}>
                                <span>${escapeHtml(applicationState.cardLabel)}</span>
                                <span class="material-symbols-outlined">${applicationState.icon}</span>
                            </button>
                        ` : `
                            <span class="event-past-badge">
                                <span class="material-symbols-outlined">check_circle</span>
                                ${escapeHtml(t('eventsPage.completed'))}
                            </span>
                        `}
                    </div>
                </div>
            </div>
        </div>
    `;

    return eventCard;
}

function renderEvents(category = 'all', timeFilter = 'upcoming') {
    const eventsGrid = document.getElementById('eventsGrid');
    const noEventsMessage = document.getElementById('noEventsMessage');
    const loadMoreWrapper = document.getElementById('eventsLoadMoreWrapper');
    const loadMoreButton = document.getElementById('eventsLoadMore');

    if (!eventsGrid) return;

    eventsGrid.innerHTML = '';

    let filteredEvents = events.filter(event => {
        const categoryMatch = category === 'all' || event.category === category;
        const timeMatch = getEventTimeStatus(event) === timeFilter;
        return categoryMatch && timeMatch;
    });

    filteredEvents.sort((a, b) => {
        const dateA = getSortableDate(a);
        const dateB = getSortableDate(b);
        return timeFilter === 'upcoming' ? dateA - dateB : dateB - dateA;
    });

    if (filteredEvents.length === 0) {
        noEventsMessage.style.display = 'flex';
        eventsGrid.style.display = 'none';
        if (loadMoreWrapper) loadMoreWrapper.style.display = 'none';
    } else {
        noEventsMessage.style.display = 'none';
        eventsGrid.style.display = 'grid';

        const visibleEvents = filteredEvents.slice(0, visibleEventsLimit);

        visibleEvents.forEach((event, index) => {
            const card = createEventCard(event);
            card.style.animationDelay = `${index * 0.1}s`;
            eventsGrid.appendChild(card);
        });

        if (loadMoreWrapper && loadMoreButton) {
            const hasMoreEvents = visibleEventsLimit < filteredEvents.length;
            loadMoreWrapper.style.display = hasMoreEvents ? 'flex' : 'none';
            loadMoreButton.innerHTML = `
                <span>${escapeHtml(t('eventsPage.loadMore'))}</span>
                <span class="material-symbols-outlined">expand_more</span>
            `;
        }
    }
}

function initializeFilters() {
    const categoryTags = document.querySelectorAll('.filter-tag');
    const toggleBtns = document.querySelectorAll('.toggle-btn');

    const tagsWrapper = document.querySelector('.filter-tags');
    let underline = null;
    if (tagsWrapper) {
        underline = document.createElement('div');
        underline.className = 'filter-underline';
        tagsWrapper.appendChild(underline);
    }

    function moveUnderlineTo(tag) {
        if (!underline || !tag) return;
        const left = tag.offsetLeft;
        const width = tag.offsetWidth;
        underline.style.left = `${left}px`;
        underline.style.width = `${width}px`;
    }

    const eventsGrid = document.getElementById('eventsGrid');
    function animateAndRender(category, timeFilter) {
        if (!eventsGrid) return renderEvents(category, timeFilter);
        eventsGrid.classList.add('is-exiting');
        setTimeout(() => {
            renderEvents(category, timeFilter);
            eventsGrid.classList.remove('is-exiting');
            eventsGrid.classList.add('is-entering');
            requestAnimationFrame(() => {
                eventsGrid.classList.add('active');
                setTimeout(() => {
                    eventsGrid.classList.remove('is-entering');
                    eventsGrid.classList.remove('active');
                }, 360);
            });
        }, 240);
    }

    categoryTags.forEach(tag => {
        tag.addEventListener('click', () => {
            categoryTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            currentCategory = tag.dataset.category;
            visibleEventsLimit = initialVisibleEvents;
            moveUnderlineTo(tag);
            animateAndRender(currentCategory, currentTimeFilter);
        });
    });

    const toggleContainer = document.querySelector('.filter-toggle');
    let slider = null;

    if (toggleContainer) {
        slider = document.createElement('div');
        slider.className = 'toggle-slider no-transition';
        toggleContainer.appendChild(slider);
    }

    function updateSlider() {
        const activeBtn = document.querySelector('.toggle-btn.active');
        if (activeBtn && slider) {
            slider.style.width = `${activeBtn.offsetWidth}px`;
            slider.style.transform = `translateX(${activeBtn.offsetLeft - 6}px)`;
        }
    }

    if (slider) {
        requestAnimationFrame(() => {
            updateSlider();
            slider.offsetHeight;
            slider.classList.remove('no-transition');
        });

        window.addEventListener('resize', () => {
            slider.classList.add('no-transition');
            updateSlider();
            slider.offsetHeight;
            slider.classList.remove('no-transition');
        });
    }

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentTimeFilter = btn.dataset.filter;
            visibleEventsLimit = initialVisibleEvents;
            if (slider) updateSlider();
            animateAndRender(currentCategory, currentTimeFilter);
        });
    });

    const loadMoreButton = document.getElementById('eventsLoadMore');
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', () => {
            visibleEventsLimit += visibleEventsIncrement;
            renderEvents(currentCategory, currentTimeFilter);
        });
    }

    window.addEventListener('load', () => {
        const active = document.querySelector('.filter-tag.active');
        if (active) moveUnderlineTo(active);
    });
    window.addEventListener('resize', () => {
        const active = document.querySelector('.filter-tag.active');
        if (active) moveUnderlineTo(active);
    });

    const activeInitial = document.querySelector('.filter-tag.active');
    if (activeInitial) moveUnderlineTo(activeInitial);

    document.addEventListener('languagechange', () => {
        requestAnimationFrame(() => {
            const active = document.querySelector('.filter-tag.active');
            if (active) moveUnderlineTo(active);
            updateSlider();
        });
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    initializeFilters();
    initializeModal();

    events = await loadGdgEvents();
    renderEvents('all', 'upcoming');

    openEventFromUrl();

    document.addEventListener('languagechange', () => {
        renderEvents(currentCategory, currentTimeFilter);
        if (activeEventId) {
            openEventModal(activeEventId, { updateUrl: false });
        }
    });
});

function openRegistration(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    const applicationState = getApplicationState(event, getCapacityInfo(event));
    if (!applicationState.canApply || !applicationState.url) return;

    window.open(applicationState.url, '_blank', 'noopener,noreferrer');
}

function openEventFromUrl() {
    const eventUrlId = new URLSearchParams(window.location.search).get(eventUrlParam);
    if (!eventUrlId) return false;

    const event = findEventByUrlId(eventUrlId);
    if (!event) return false;

    openEventModal(event.id, { updateUrl: false });
    return true;
}

function openEventModal(eventId, { updateUrl = true } = {}) {
    const event = findEventByUrlId(eventId);
    if (!event) return;
    const localizedEvent = getLocalizedItem(event);

    const modal = document.getElementById('eventModal');
    const modalBody = document.getElementById('eventModalBody');
    const wasActive = modal.classList.contains('active');

    activeEventId = event.id;

    const config = categoryConfig[event.category] || categoryConfig.tech_talk;
    const categoryLabel = t(config.labelKey);
    const dateInfo = formatDate(event.date);
    const upcoming = getEventTimeStatus(event) === 'upcoming';
    const capacity = getCapacityInfo(event);
    const applicationState = getApplicationState(event, capacity, localizedEvent);
    const timeDetails = getEventTimeDetails(event);
    const mapUrl = getMapEmbedUrl(localizedEvent.location);

    const categoryIcon = {
        'summit': 'emoji_events',
        'tech_talk': 'campaign',
        'workshop': 'construction',
        'study_jam': 'school',
        'trip': 'directions_bus',
        'info_session': 'info',
        'design': 'palette'
    };

    modalBody.innerHTML = `
        <div class="event-modal-header">
            <div class="event-modal-category" style="background: ${config.colorHex};">
                <span class="material-symbols-outlined">
                    ${categoryIcon[event.category] || config.icon}
                </span>
                ${escapeHtml(categoryLabel)}
            </div>
            <h1 class="event-modal-title">${escapeHtml(localizedEvent.title)}</h1>
            <div class="event-modal-meta">
                <div class="event-modal-meta-item">
                    <span class="material-symbols-outlined">calendar_today</span>
                    ${escapeHtml(dateInfo.full)}
                </div>
                <div class="event-modal-meta-item">
                    <span class="material-symbols-outlined">schedule</span>
                    ${escapeHtml(getEventTimeRangeText(event))}
                </div>
                <div class="event-modal-meta-item">
                    <span class="material-symbols-outlined">location_on</span>
                    ${escapeHtml(localizedEvent.location)}
                </div>
                ${capacity.hasCapacity ? `
                    <div class="event-modal-meta-item">
                        <span class="material-symbols-outlined">group</span>
                        ${escapeHtml(capacity.spotsLeft > 0 ? t('eventsPage.spotsLeft', { count: capacity.spotsLeft }) : t('eventsPage.full'))}
                    </div>
                ` : ''}
            </div>
        </div>
        
        <div class="event-modal-body">
            ${event.image ? `
                <div class="event-image-placeholder">
                    <img src="${escapeHtml(event.image)}" alt="${escapeHtml(localizedEvent.title)}">
                </div>
            ` : `
                <div class="event-image-placeholder">
                    <span class="material-symbols-outlined">image</span>
                    <p>${escapeHtml(t('eventsPage.tempImageTitle'))}</p>
                    <small>${escapeHtml(t('eventsPage.tempImageText'))}</small>
                </div>
            `}
            
            <div class="event-description">
                <h3>${escapeHtml(t('eventsPage.descriptionTitle'))}</h3>
                <p>${escapeHtml(localizedEvent.description)}</p>
            </div>
            
            <div class="event-details-grid">
                <div class="event-detail-card event-location-card">
                    <h4><span class="material-symbols-outlined">location_on</span>${escapeHtml(t('eventsPage.locationTitle'))}</h4>
                    <div class="event-location-address">
                        <span class="material-symbols-outlined">pin_drop</span>
                        <span>${escapeHtml(localizedEvent.location)}</span>
                    </div>
                    <iframe
                        class="event-map-widget"
                        title="${escapeHtml(t('eventsPage.mapTitle'))}"
                        src="${escapeHtml(mapUrl)}"
                        loading="lazy"
                        referrerpolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
                
                <div class="event-detail-card event-time-card">
                    <h4><span class="material-symbols-outlined">schedule</span>${escapeHtml(t('eventsPage.timeTitle'))}</h4>
                    <div class="event-time-list">
                        <div class="event-time-row">
                            <span>${escapeHtml(t('eventsPage.dayLabel'))}</span>
                            <strong>${escapeHtml(timeDetails.day)}</strong>
                        </div>
                        <div class="event-time-row">
                            <span>${escapeHtml(t('eventsPage.startLabel'))}</span>
                            <strong>${escapeHtml(timeDetails.start)}</strong>
                        </div>
                        <div class="event-time-row">
                            <span>${escapeHtml(t('eventsPage.endLabel'))}</span>
                            <strong>${escapeHtml(timeDetails.end)}</strong>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="event-registration-section">
                <div class="registration-info">
                    <h3>${escapeHtml(t('eventsPage.registrationTitle'))}</h3>
                    ${capacity.hasCapacity ? `
                        <div class="registration-stats">
                            <div class="stat">
                                <span class="stat-number">${Number(event.registered)}</span>
                                <span class="stat-label">${escapeHtml(t('eventsPage.registered'))}</span>
                            </div>
                            <div class="stat">
                                <span class="stat-number">${Number(event.spots)}</span>
                                <span class="stat-label">${escapeHtml(t('eventsPage.totalCapacity'))}</span>
                            </div>
                            <div class="stat">
                                <span class="stat-number">${capacity.spotsLeft}</span>
                                <span class="stat-label">${escapeHtml(t('eventsPage.remaining'))}</span>
                            </div>
                        </div>
                    ` : ''}
                </div>
                
                <div class="registration-action">
                    ${upcoming ? `
                        <button type="button" class="btn btn-primary btn-large register-btn" data-event-id="${escapeHtml(event.id)}" ${applicationState.canApply ? '' : 'disabled'}>
                            <span class="material-symbols-outlined">${applicationState.icon}</span>
                            ${escapeHtml(applicationState.buttonLabel)}
                        </button>
                    ` : `
                        <button class="btn btn-outline btn-large" disabled>
                            <span class="material-symbols-outlined">event_busy</span>
                            ${escapeHtml(t('eventsPage.eventCompleted'))}
                        </button>
                    `}
                    <p class="registration-note">
                        ${escapeHtml(applicationState.note)}
                    </p>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('active');

    if (!wasActive) {
        previousBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
    }

    if (updateUrl) {
        setEventUrl(event);
    }
}

function closeEventModal({ updateUrl = true } = {}) {
    const modal = document.getElementById('eventModal');
    const wasActive = modal.classList.contains('active');
    modal.classList.remove('active');

    if (wasActive) {
        document.body.style.overflow = previousBodyOverflow;
        previousBodyOverflow = '';
    }

    activeEventId = null;

    if (updateUrl) {
        clearEventUrl();
    }
}

function initializeModal() {
    const modal = document.getElementById('eventModal');
    const closeBtn = document.getElementById('modalClose');

    closeBtn.addEventListener('click', closeEventModal);

    modal.addEventListener('click', (e) => {
        const registerButton = e.target.closest('.register-btn');
        if (registerButton && !registerButton.disabled) {
            e.preventDefault();
            openRegistration(registerButton.getAttribute('data-event-id'));
            return;
        }

        if (e.target === modal) {
            closeEventModal();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeEventModal();
        }
    });

    window.addEventListener('popstate', () => {
        if (openEventFromUrl()) return;
        if (modal.classList.contains('active')) {
            closeEventModal({ updateUrl: false });
        }
    });

    document.getElementById('eventsGrid').addEventListener('click', (e) => {
        const registerButton = e.target.closest('.event-register');
        if (registerButton) {
            e.preventDefault();
            e.stopPropagation();
            if (registerButton.disabled) return;
            const card = registerButton.closest('.event-card');
            openRegistration(card?.getAttribute('data-event-id'));
            return;
        }

        const card = e.target.closest('.event-card');
        if (card) {
            const eventId = card.getAttribute('data-event-url-id') || card.getAttribute('data-event-id');
            openEventModal(eventId);
        }
    });
}
