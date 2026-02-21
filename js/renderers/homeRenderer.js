import { stats } from "../data/statsData.js";
import { collabs } from "../data/collabsData.js";
import { events } from "../data/eventsData.js";
import { blogData } from "../data/blogData.js";
import { observeVisibility, observeCounter, initOrbVisibilityControl, initPageVisibilityControl } from "../utils/observer.js";

const focusTracks = [
    {
        id: 'web-mobile',
        title: 'Web & Mobil Geliştiriciliği',
        icon: 'devices',
        description: 'Modern web ve mobil uygulama geliştirme teknolojileri ile projeler oluşturun.',
        tags: ['Flutter', 'React', 'Firebase', 'PWA'],
        level: 'Her Seviye',
        duration: 'Dönem Boyu',
        teamRef: 'Web Development Team'
    },
    {
        id: 'game-dev',
        title: 'Oyun Geliştiriciliği',
        icon: 'neurology',
        description: 'Unity ve diğer oyun motorları ile yaratıcı oyun projeleri geliştirin.',
        tags: ['Unity', 'C#', 'Game Design', '3D'],
        level: 'Her Seviye',
        duration: 'Dönem Boyu',
        teamRef: 'Game Development Team'
    },
    {
        id: 'design',
        title: 'Tasarım & Sosyal Medya',
        icon: 'palette',
        description: 'Dijital tasarım ve sosyal medya stratejileri ile topluluk etkileşimini artırın.',
        tags: ['UI/UX', 'Figma', 'Branding', 'Content'],
        level: 'Her Seviye',
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

const renderStats = () => {
    const statsGrid = document.querySelector('.stats-grid');
    if (!statsGrid) return;

    statsGrid.innerHTML = stats.map((stat, index) => `
        <div class="stat-card" data-delay="${index}">
            <div class="stat-number ${stat.color}" data-target="${stat.number}" data-suffix="${stat.suffix}">0${stat.suffix}</div>
            <div class="stat-label">${stat.label}</div>
        </div>
    `).join('');

    document.querySelectorAll('.stat-card').forEach(card => {
        observeVisibility(card);

        observeCounter(card, (element) => {
            const statNumber = element.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                animateValue(statNumber);
                statNumber.classList.add('animated');
            }
        });
    });
};

const animateValue = (element) => {
    const target = parseInt(element.getAttribute('data-target'));
    const suffix = element.getAttribute('data-suffix');
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const ease = 1 - Math.pow(1 - progress, 4);

        const current = Math.floor(start + (target - start) * ease);
        element.textContent = `${current}${suffix}`;

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    };

    requestAnimationFrame(update);
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
    const dateObj = new Date(event.date);
    const month = dateObj.toLocaleDateString('tr-TR', { month: 'short' });
    const day = dateObj.toLocaleDateString('tr-TR', { day: 'numeric' });

    return `
        <div class="home-event-card" data-event-id="${event.id}">
            <div class="home-event-datebox">
                <span class="home-event-month">${month}</span>
                <span class="home-event-day">${day}</span>
            </div>
            <div class="home-event-info">
                <div class="home-event-meta">
                    <span class="home-event-time"><span class="material-symbols-outlined">schedule</span> ${event.time}</span>
                    <span class="home-event-location"><span class="material-symbols-outlined">location_on</span> ${event.location}</span>
                </div>
                <h3 class="home-event-title">${event.title}</h3>
            </div>
            <div class="home-event-action">
                <span class="material-symbols-outlined">arrow_forward</span>
            </div>
        </div>
    `;
};

const renderHomeEvents = () => {
    const container = document.getElementById('homeEventsList');
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.gap = '16px';

    if (!container) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const upcomingEvents = events
        .filter(event => new Date(event.date) >= today)
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 3);

    if (!upcomingEvents.length) {
        container.innerHTML = `
            <div class="empty-state">
                <span class="material-symbols-outlined">event_busy</span>
                <p>We're finalizing our next round of events. Check back soon!</p>
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
                window.location.href = `events.html?eventId=${eventId}`;
            }
        });
    });
};

const combineEventDateTime = (event) => {
    return new Date(`${event.date}T${event.time}`);
};

const getNextEvent = () => {
    if (!events?.length) return null;
    const sorted = [...events].sort((a, b) => combineEventDateTime(a) - combineEventDateTime(b));
    const now = new Date();
    return sorted.find(event => combineEventDateTime(event) >= now) || sorted[sorted.length - 1];
};

const startEventCountdown = () => {
    const countdownEl = document.getElementById('eventCountdown');
    const nextEvent = getNextEvent();

    if (!countdownEl || !nextEvent) {
        if (countdownEl) {
            countdownEl.style.display = 'none';
        }
        return;
    }

    if (countdownInterval) {
        clearInterval(countdownInterval);
    }

    const renderCountdown = () => {
        const now = new Date();
        const eventDate = combineEventDateTime(nextEvent);
        const diff = eventDate - now;

        if (diff <= 0) {
            countdownEl.innerHTML = `
                <span>
                    <span class="material-symbols-outlined">celebration</span>
                    Happening now!
                </span>
                <span class="countdown-event-name">${nextEvent.title}</span>
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
            <span class="countdown-event-name">${nextEvent.title}</span>
        `;
    };

    renderCountdown();
    countdownInterval = setInterval(renderCountdown, 60000);
};


const createBlogCard = (post) => {
    const categoryMap = {
        'Etkinlikler': 'web-dev',
        'Geliştirme': 'web-dev',
        'Yapay Zeka': 'ai-ml',
        'Web': 'web-dev',
        'Cloud': 'cloud'
    };

    const categoryClass = categoryMap[post.category] || 'web-dev';
    const categoryDisplay = post.category;

    return `
        <div class="blog-card" data-category="${categoryClass}" data-blog-id="${post.id}">
            <div class="blog-content">
                <div class="blog-category category-${categoryClass}">${categoryDisplay}</div>
                <h3 class="blog-title">${post.title}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <div class="blog-meta">
                    <span>${post.author} • ${formatBlogDate(post.date)}</span>
                    <span>${post.readTime}</span>
                </div>
            </div>
        </div>
    `;
};

const formatBlogDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
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
            window.location.href = 'blog.html';
        });
    });
};


const createTrackCard = (track, index) => {
    return `
        <div class="track-card" data-delay="${index}" data-track-id="${track.id}">
            <div class="track-icon">
                <span class="material-symbols-outlined">${track.icon}</span>
            </div>
            <h3 class="track-title">${track.title}</h3>
            <p class="track-description">${track.description}</p>
            <div class="track-tags">
                ${track.tags.map(tag => `<span class="track-tag">${tag}</span>`).join('')}
            </div>
            <div class="track-footer">
                <span>${track.level}</span>
                <span>${track.duration}</span>
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


const initNewsletterForm = () => {
    const form = document.getElementById('newsletterForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput?.value;

        if (email) {
            const btn = form.querySelector('.btn');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = `
                <span class="material-symbols-outlined">check_circle</span>
                Kaydedildi!
            `;
            btn.style.background = 'var(--gdg-green)';

            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                emailInput.value = '';
            }, 3000);
        }
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

document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderCollabs();
    renderHomeEvents();
    renderHomeBlog();
    renderFocusTracks();
    startEventCountdown();
    initNewsletterForm();
    initFloatingCta();
    applyThemeToCollabs();

    initOrbVisibilityControl();
    initPageVisibilityControl();

    document.addEventListener('themechange', (event) => {
        cachedLogoElements = null;
        applyThemeToCollabs(event.detail || getCurrentTheme());
    });
});
