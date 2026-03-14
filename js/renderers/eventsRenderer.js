import { events } from '../data/eventsData.js';

const categoryConfig = {
    summit: {
        color: 'var(--gdg-blue)',
        colorHex: '#4285F4',
        bgColor: 'var(--gdg-blue-ambient)',
        icon: 'emoji_events',
        label: 'Zirve'
    },
    tech_talk: {
        color: 'var(--gdg-green)',
        colorHex: '#34A853',
        bgColor: 'var(--gdg-green-ambient)',
        icon: 'mic',
        label: 'Teknoloji Konuşması'
    },
    workshop: {
        color: 'var(--gdg-yellow)',
        colorHex: '#FBBC04',
        bgColor: 'var(--gdg-yellow-ambient)',
        icon: 'construction',
        label: 'Atölye'
    },
    trip:{ 
        color: 'var(--gdg-red)',
        colorHex: '#EE352E',
        bgColor: 'var(--gdg-red-ambient)',
        icon: 'directions_bus',
        label: 'Gezi'
    },
    info_session: {
        color: 'var(--gdg-blue)',
        colorHex: '#4285F4',
        bgColor: 'var(--gdg-blue-ambient)',
        icon: 'info',
        label: 'Bilgilendirme Oturumu'
    },
    design: {
        color: 'var(--gdg-blue)',
        colorHex: '#4285F4',
        bgColor: 'var(--gdg-blue-ambient)',
        icon: 'palette',
        label: 'Tasarım'
    }
};

function formatDate(dateString) {
    const date = new Date(dateString);
    return {
        day: date.getDate(),
        month: date.toLocaleDateString('tr-TR', { month: 'short' }),
        year: date.getFullYear(),
        full: date.toLocaleDateString('tr-TR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    };
}

function isUpcoming(dateString) {
    const eventDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate >= today;
}

function getRegistrationProgress(registered, spots) {
    return Math.min((registered / spots) * 100, 100);
}

function createEventCard(event) {
    const config = categoryConfig[event.category] || categoryConfig.tech_talk;
    const dateInfo = formatDate(event.date);
    const upcoming = isUpcoming(event.date);
    const progress = getRegistrationProgress(event.registered, event.spots);
    const spotsLeft = event.spots - event.registered;

    const eventCard = document.createElement('article');
    eventCard.className = `event-card ${upcoming ? 'upcoming' : 'past'} category-${event.category}`;
    eventCard.setAttribute('data-category', event.category);
    eventCard.setAttribute('data-date', event.date);
    eventCard.setAttribute('data-event-id', event.id);
    eventCard.style.cursor = 'pointer';

    eventCard.innerHTML = `
        <div class="event-card-inner">
            <div class="event-image-wrapper">
                ${event.image ? `<img src="${event.image}" alt="${event.title}" class="event-image" loading="lazy">` : ''}
                <div class="event-image-overlay"></div>
                <div class="event-date-badge">
                    <span class="date-day">${dateInfo.day}</span>
                    <span class="date-month">${dateInfo.month}</span>
                </div>
                <div class="event-category-badge" style="background: ${config.color};">
                    <span class="material-symbols-outlined">${config.icon}</span>
                    ${config.label}
                </div>
            </div>
            
            <div class="event-content">
                <h3 class="event-title">${event.title}</h3>
                
                <div class="event-meta">
                    <div class="meta-item">
                        <span class="material-symbols-outlined">schedule</span>
                        <span>${event.time}</span>
                    </div>
                    <div class="meta-item">
                        <span class="material-symbols-outlined">location_on</span>
                        <span>${event.location}</span>
                    </div>
                </div>
                
                <p class="event-description">${event.description}</p>
                
                ${event.speakers && event.speakers.length > 0 ? `
                    <div class="event-speakers">
                        <span class="material-symbols-outlined">person</span>
                        <span>${event.speakers.slice(0, 2).join(', ')}${event.speakers.length > 2 ? ` +${event.speakers.length - 2}` : ''}</span>
                    </div>
                ` : ''}
                
                <div class="event-footer">
                    <div class="event-capacity">
                        <div class="capacity-bar">
                            <div class="capacity-fill" style="width: ${progress}%; background: ${config.color};"></div>
                        </div>
                    </div>
                    <div class="event-footer-bottom">
                        <span class="capacity-text">${spotsLeft > 0 ? `${spotsLeft} kişilik yer kaldı` : 'Dolu'}</span>

                        ${upcoming ? `
                            <span class="register-separator" aria-hidden="true"></span>
                            <button type="button" class="btn btn-outline event-register">
                                <span>Kayıt Ol</span>
                                <span class="material-symbols-outlined">person_add</span>
                            </button>
                        ` : `
                            <span class="event-past-badge">
                                <span class="material-symbols-outlined">check_circle</span>
                                Tamamlandı
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

    if (!eventsGrid) return;

    eventsGrid.innerHTML = '';

    let filteredEvents = events.filter(event => {
        const categoryMatch = category === 'all' || event.category === category;
        const timeMatch = timeFilter === 'upcoming' ? isUpcoming(event.date) : !isUpcoming(event.date);
        return categoryMatch && timeMatch;
    });

    filteredEvents.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return timeFilter === 'upcoming' ? dateA - dateB : dateB - dateA;
    });

    if (filteredEvents.length === 0) {
        noEventsMessage.style.display = 'flex';
        eventsGrid.style.display = 'none';
    } else {
        noEventsMessage.style.display = 'none';
        eventsGrid.style.display = 'grid';

        filteredEvents.forEach((event, index) => {
            const card = createEventCard(event);
            card.style.animationDelay = `${index * 0.1}s`;
            eventsGrid.appendChild(card);
        });
    }
}

function initializeFilters() {
    const categoryTags = document.querySelectorAll('.filter-tag');
    const toggleBtns = document.querySelectorAll('.toggle-btn');

    let currentCategory = 'all';
    let currentTimeFilter = 'upcoming';

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
            if (slider) updateSlider();
            animateAndRender(currentCategory, currentTimeFilter);
        });
    });

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
}

document.addEventListener('DOMContentLoaded', () => {
    renderEvents('all', 'upcoming');
    initializeFilters();
    initializeModal();

    const urlParams = new URLSearchParams(window.location.search);
    const eventIdParam = urlParams.get('eventId');
    if (eventIdParam) {
        setTimeout(() => {
            openEventModal(eventIdParam);
        }, 100);
    }
});


function openEventModal(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    const modal = document.getElementById('eventModal');
    const modalBody = document.getElementById('eventModalBody');

    const config = categoryConfig[event.category] || categoryConfig.tech_talk;
    const dateInfo = formatDate(event.date);
    const upcoming = isUpcoming(event.date);
    const spotsLeft = Math.max(event.spots - event.registered, 0);

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
                ${config.label}
            </div>
            <h1 class="event-modal-title">${event.title}</h1>
            <div class="event-modal-meta">
                <div class="event-modal-meta-item">
                    <span class="material-symbols-outlined">calendar_today</span>
                    ${dateInfo.full}
                </div>
                <div class="event-modal-meta-item">
                    <span class="material-symbols-outlined">schedule</span>
                    ${event.time}
                </div>
                <div class="event-modal-meta-item">
                    <span class="material-symbols-outlined">location_on</span>
                    ${event.location}
                </div>
                <div class="event-modal-meta-item">
                    <span class="material-symbols-outlined">group</span>
                    ${spotsLeft > 0 ? `${spotsLeft} kişilik yer kaldı` : 'Dolu'}
                </div>
            </div>
        </div>
        
        <div class="event-modal-body">
            <div class="event-image-placeholder">
                <span class="material-symbols-outlined">image</span>
                <p>Geçici Etkinlik Resmi</p>
                <small>Etkinlik tanıtım resmi burada gösterilecek</small>
            </div>
            
            <div class="event-description">
                <h3>Etkinlik Açıklaması</h3>
                <p>${event.description}</p>
            </div>
            
            <div class="event-details-grid">
                ${event.speakers && event.speakers.length > 0 ? `
                    <div class="event-detail-card">
                        <h4><span class="material-symbols-outlined">record_voice_over</span>Konuşmacılar</h4>
                        ${event.speakers.map(speaker => `<p>${speaker}</p>`).join('')}
                    </div>
                ` : event.organizer ? `
                    <div class="event-detail-card">
                        <h4><span class="material-symbols-outlined">person</span>Organizatör</h4>
                        <p>${event.organizer}</p>
                    </div>
                ` : ''}
                
                ${event.details && event.details.length > 0 ? `
                    <div class="event-detail-card">
                        <h4><span class="material-symbols-outlined">info</span>Neler Öğreneceksiniz</h4>
                        <ul>
                            ${event.details.map(detail => `<li>${detail}</li>`).join('')}
                        </ul>
                    </div>
                ` : `
                    <div class="event-detail-card">
                        <h4><span class="material-symbols-outlined">info</span>Neler Öğreneceksiniz</h4>
                        <ul>
                            <li>İnteraktif ${config.label} oturumu</li>
                            <li>Uygulamalı öğrenme deneyimi</li>
                            <li>Konuşmacıyla soru-cevap</li>
                            <li>Networking fırsatları</li>
                        </ul>
                    </div>
                `}
                
                <div class="event-detail-card">
                    <h4><span class="material-symbols-outlined">checklist</span>Gereksinimler</h4>
                    <p>${event.requirements || 'Önceden deneyim gerekmiyor - tüm seviyelere uygundur!'}</p>
                </div>
            </div>
            
            <div class="event-registration-section">
                <div class="registration-info">
                    <h3>Kayıt Detayları</h3>
                    <div class="registration-stats">
                        <div class="stat">
                            <span class="stat-number">${event.registered}</span>
                            <span class="stat-label">Kayıtlı</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">${event.spots}</span>
                            <span class="stat-label">Toplam Kapasite</span>
                        </div>
                        <div class="stat">
                            <span class="stat-number">${spotsLeft}</span>
                            <span class="stat-label">Kalan Yer</span>
                        </div>
                    </div>
                </div>
                
                <div class="registration-action">
                    ${upcoming ? `
                        <button class="btn btn-primary btn-large register-btn" data-event-id="${event.id}" ${spotsLeft === 0 ? 'disabled' : ''}>
                            <span class="material-symbols-outlined">${spotsLeft > 0 ? 'person_add' : 'schedule'}</span>
                            ${spotsLeft > 0 ? 'Şimdi Kayıt Ol' : 'Bekleme Listesine Katıl'}
                        </button>
                    ` : `
                        <button class="btn btn-outline btn-large" disabled>
                            <span class="material-symbols-outlined">event_busy</span>
                            Etkinlik Tamamlandı
                        </button>
                    `}
                    <p class="registration-note">
                        ${upcoming ? 'Kayıt ücretsizdir! Kayıt olduktan sonra onay e-postası alacaksınız.' : 'Bu etkinlik sona ermiştir.'}
                    </p>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeEventModal() {
    const modal = document.getElementById('eventModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

function initializeModal() {
    const modal = document.getElementById('eventModal');
    const closeBtn = document.getElementById('modalClose');

    closeBtn.addEventListener('click', closeEventModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeEventModal();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeEventModal();
        }
    });

    document.getElementById('eventsGrid').addEventListener('click', (e) => {
        const card = e.target.closest('.event-card');
        if (card) {
            const eventId = card.getAttribute('data-event-id');
            openEventModal(eventId);
        }
    });
}
