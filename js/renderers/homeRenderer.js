import { blogData } from "../data/blogData.js";
import { loadGdgEvents } from "../utils/gdgEventsFetcher.js";
import { observeVisibility, initOrbVisibilityControl, initPageVisibilityControl } from "../utils/observer.js";
import { getLocale, getLocalizedItem, t } from "../translations.js";

let events = [];

const focusTracks = [
    {
        id: 'web-mobile',
        titleKey: 'data.focusTracks.webMobile.title',
        title: 'Web & Mobil Geliştiriciliği',
        icon: 'devices',
        descriptionKey: 'data.focusTracks.webMobile.description',
        description: 'Modern web ve mobil uygulama geliştirme teknolojileri ile projeler oluşturun.',
        tags: ['Flutter', 'React', 'Firebase', 'PWA'],
        levelKey: 'data.focusTracks.webMobile.level',
        level: 'Her Seviye',
        durationKey: 'data.focusTracks.webMobile.duration',
        duration: 'Dönem Boyu',
        teamRef: 'Web Development Team'
    },
    {
        id: 'game-dev',
        titleKey: 'data.focusTracks.gameDev.title',
        title: 'Oyun Geliştiriciliği',
        icon: 'neurology',
        descriptionKey: 'data.focusTracks.gameDev.description',
        description: 'Unity ve diğer oyun motorları ile yaratıcı oyun projeleri geliştirin.',
        tags: ['Unity', 'C#', 'Game Design', '3D'],
        levelKey: 'data.focusTracks.gameDev.level',
        level: 'Her Seviye',
        durationKey: 'data.focusTracks.gameDev.duration',
        duration: 'Dönem Boyu',
        teamRef: 'Game Development Team'
    },
    {
        id: 'design',
        titleKey: 'data.focusTracks.design.title',
        title: 'Tasarım & Sosyal Medya',
        icon: 'palette',
        descriptionKey: 'data.focusTracks.design.description',
        description: 'Dijital tasarım ve sosyal medya stratejileri ile topluluk etkileşimini artırın.',
        tags: ['UI/UX', 'Figma', 'Branding', 'Content'],
        levelKey: 'data.focusTracks.design.level',
        level: 'Her Seviye',
        durationKey: 'data.focusTracks.design.duration',
        duration: 'Dönem Boyu',
        teamRef: 'Social Media & Design Team'
    }
];

const getCurrentTheme = () =>
    document.documentElement.getAttribute('data-color-scheme') ||
    localStorage.getItem('theme') ||
    'light';

const getLogoForTheme = (collab, theme = getCurrentTheme()) => {
    if (theme === 'dark' && collab.darkLogo) {
        return collab.darkLogo;
    }
    return collab.logo;
};

const renderCollabs = () => {
    const collabGrid = document.querySelector('.collab-grid');
    if (!collabGrid) return;

    const themeForRender = getCurrentTheme();

    collabGrid.innerHTML = collabs.map((collab, index) => {
        const logoSrc = getLogoForTheme(collab, themeForRender);
        const logoScale = collab.logoScale || 1;

        return `
            <a href="${collab.url}" target="_blank" rel="noopener noreferrer" class="collab-card-link">
                <div class="collab-card" data-delay="${index}">
                    <div class="collab-logo-container">
                        <img 
                            src="${logoSrc}" 
                            alt="${collab.name} Logo" 
                            class="collab-logo-img"
                            loading="lazy"
                            decoding="async"
                            data-logo-light="${collab.logo}"
                            data-logo-dark="${collab.darkLogo || collab.logo}"
                            style="transform: scale(${logoScale});"
                        >
                    </div>
                    <h3>${collab.name}</h3>
                    <p>${collab.description}</p>
                </div>
            </a>
        `;
    }).join('');

    document.querySelectorAll('.collab-card').forEach(card => {
        observeVisibility(card);
    });
};

let cachedLogoElements = null;
let countdownInterval = null;

const escapeHtml = (value) => String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const parseLocalDate = (dateString) => {
    const [year, month, day] = String(dateString || '').split('-').map(Number);
    if (!year || !month || !day) return new Date(dateString);
    return new Date(year, month - 1, day);
};

const combineEventDateTime = (event) => {
    if (event?.startDate) return new Date(event.startDate);
    return new Date(`${event.date}T${event.time || '00:00'}`);
};

const getEventUrlId = (event) => event?.slug || event?.id || '';
const isUpcomingEvent = (event) => {
    if (event?.timeStatus) return event.timeStatus === 'upcoming';

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return parseLocalDate(event.date) >= today;
};

const applyThemeToCollabs = (theme = getCurrentTheme()) => {
    if (!cachedLogoElements) {
        cachedLogoElements = document.querySelectorAll('.collab-logo-img');
    }

    cachedLogoElements.forEach(img => {
        const light = img.dataset.logoLight;
        const dark = img.dataset.logoDark || light;
        if (!light) return;
        img.src = theme === 'dark' ? dark : light;
    });
};


const createHomeEventCard = (event) => {
    const localizedEvent = getLocalizedItem(event);
    const dateObj = parseLocalDate(event.date);
    const locale = getLocale();
    const month = dateObj.toLocaleDateString(locale, { month: 'short' });
    const day = dateObj.toLocaleDateString(locale, { day: 'numeric' });

    return `
        <div class="home-event-card" data-event-id="${event.id}">
            <div class="home-event-datebox">
                <span class="home-event-month">${month}</span>
                <span class="home-event-day">${day}</span>
            </div>
            <div class="home-event-info">
                <div class="home-event-meta">
                    <span class="home-event-time"><span class="material-symbols-outlined">schedule</span> ${escapeHtml(event.time)}</span>
                    <span class="home-event-location"><span class="material-symbols-outlined">location_on</span> ${escapeHtml(localizedEvent.location)}</span>
                </div>
                <h3 class="home-event-title">${escapeHtml(localizedEvent.title)}</h3>
            </div>
            <div class="home-event-action">
                <span class="material-symbols-outlined">arrow_forward</span>
            </div>
        </div>
    `;
};

const renderHomeEvents = () => {
    const container = document.getElementById('homeEventsList');
    if (!container) return;

    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '16px';

    const upcomingEvents = events
        .filter(isUpcomingEvent)
        .sort((a, b) => combineEventDateTime(a) - combineEventDateTime(b))
        .slice(0, 3);

    if (!upcomingEvents.length) {
        container.innerHTML = `
            <div class="empty-state">
                <span class="material-symbols-outlined">event_busy</span>
                <p>${t('home.emptyEvents')}</p>
            </div>
        `;
    } else {
        container.innerHTML = upcomingEvents.map(event => createHomeEventCard(event)).join('');
    }

    document.querySelectorAll('.home-event-card').forEach(card => {
        observeVisibility(card);
        card.addEventListener('click', () => {
            const eventId = card.getAttribute('data-event-id');
            if (eventId) {
                const event = events.find(item => item.id === eventId);
                const eventUrlId = getEventUrlId(event) || eventId;
                window.location.href = `events.html?eventId=${encodeURIComponent(eventUrlId)}`;
            }
        });
    });
};

const getNextEvent = () => {
    if (!events?.length) return null;
    return events
        .filter(isUpcomingEvent)
        .sort((a, b) => combineEventDateTime(a) - combineEventDateTime(b))[0] || null;
};

const startEventCountdown = () => {
    const countdownEl = document.getElementById('eventCountdown');
    const nextEvent = getNextEvent();

    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }

    if (!countdownEl || !nextEvent) {
        if (countdownEl) {
            countdownEl.style.display = 'none';
            countdownEl.innerHTML = '';
        }
        return;
    }

    countdownEl.style.display = '';

    const renderCountdown = () => {
        const now = new Date();
        const eventDate = combineEventDateTime(nextEvent);
        const diff = eventDate - now;

        if (diff <= 0) {
            countdownEl.innerHTML = `
                <span>
                    <span class="material-symbols-outlined">celebration</span>
                    ${escapeHtml(t('home.happeningNow'))}
                </span>
                <span class="countdown-event-name">${escapeHtml(getLocalizedItem(nextEvent).title)}</span>
            `;
            clearInterval(countdownInterval);
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);

        countdownEl.innerHTML = `
            <span>
                <span class="material-symbols-outlined">hourglass_bottom</span>
                ${days}d ${hours}h ${minutes}m
            </span>
            <span class="countdown-event-name">${escapeHtml(getLocalizedItem(nextEvent).title)}</span>
        `;
    };

    renderCountdown();
    countdownInterval = setInterval(renderCountdown, 60000);
};


const createBlogCard = (post) => {
    const localizedPost = getLocalizedItem(post);
    const categoryMap = {
        events: 'web-dev',
        development: 'web-dev',
        ai: 'ai-ml',
        web: 'web-dev',
        cloud: 'cloud'
    };

    const categoryClass = categoryMap[post.categoryKey] || 'web-dev';
    const categoryDisplay = localizedPost.category;

    return `
        <div class="blog-card" data-category="${categoryClass}" data-blog-id="${post.id}">
            <div class="blog-content">
                <div class="blog-category category-${categoryClass}">${categoryDisplay}</div>
                <h3 class="blog-title">${localizedPost.title}</h3>
                <p class="blog-excerpt">${localizedPost.excerpt}</p>
                <div class="blog-meta">
                    <span>${post.author} • ${formatBlogDate(post.date)}</span>
                    <span>${localizedPost.readTime}</span>
                </div>
            </div>
        </div>
    `;
};

const formatBlogDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(getLocale(), {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });
};

const renderHomeBlog = () => {
    const container = document.getElementById('homeBlogList');
    if (!container) return;

    const latestPosts = blogData
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 2);

    container.innerHTML = latestPosts.map(post => createBlogCard(post)).join('');

    document.querySelectorAll('.blog-card').forEach(card => {
        observeVisibility(card);

        card.addEventListener('click', () => {
            const blogId = card.getAttribute('data-blog-id');
            if (blogId) {
                window.location.href = `blog.html?blogId=${encodeURIComponent(blogId)}`;
            }
        });
    });
};


const createTrackCard = (track, index) => {
    return `
        <div class="track-card" data-delay="${index}" data-track-id="${track.id}">
            <div class="track-icon">
                <span class="material-symbols-outlined">${track.icon}</span>
            </div>
            <h3 class="track-title">${t(track.titleKey)}</h3>
            <p class="track-description">${t(track.descriptionKey)}</p>
            <div class="track-tags">
                ${track.tags.map(tag => `<span class="track-tag">${tag}</span>`).join('')}
            </div>
            <div class="track-footer">
                <span>${t(track.levelKey)}</span>
                <span>${t(track.durationKey)}</span>
            </div>
        </div>
    `;
};

const renderFocusTracks = () => {
    const container = document.getElementById('tracksGrid');
    if (!container) return;

    container.innerHTML = focusTracks.map((track, index) => createTrackCard(track, index)).join('');

    document.querySelectorAll('.track-card').forEach(card => {
        observeVisibility(card);

        card.addEventListener('click', () => {
            window.location.href = 'teams.html';
        });
    });
};

const initFloatingCta = () => {
    const floatingCta = document.getElementById('floatingCta');
    if (!floatingCta) return;

    let lastScrollY = window.scrollY;
    let isVisible = false;
    const threshold = 400; 

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        const shouldShow = currentScrollY > threshold;

        if (shouldShow !== isVisible) {
            isVisible = shouldShow;
            floatingCta.classList.toggle('is-visible', isVisible);
        }

        lastScrollY = currentScrollY;
    };

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    handleScroll();
};

document.addEventListener('DOMContentLoaded', async () => {
    renderHomeEvents();
    renderHomeBlog();
    renderFocusTracks();
    startEventCountdown();
    initFloatingCta();
    

    initOrbVisibilityControl();
    initPageVisibilityControl();

    document.addEventListener('themechange', (event) => {
        cachedLogoElements = null;
        
    });

    events = await loadGdgEvents();
    renderHomeEvents();
    startEventCountdown();

    document.addEventListener('languagechange', () => {
        renderHomeEvents();
        renderHomeBlog();
        renderFocusTracks();
        startEventCountdown();
    });
});
