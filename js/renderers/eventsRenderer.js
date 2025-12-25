import { events } from '../data/eventsData.js';

// Category configuration with colors and icons
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
        label: 'Teknoloji Sohbeti'
    },
    workshop: {
        color: 'var(--gdg-yellow)',
        colorHex: '#FBBC04',
        bgColor: 'var(--gdg-yellow-ambient)',
        icon: 'construction',
        label: 'Atölye'
    },
    study_jam: {
        color: 'var(--gdg-red)',
        colorHex: '#EA4335',
        bgColor: 'var(--gdg-red-ambient)',
        icon: 'school',
        label: 'Çalışma Etkinliği'
    },
    info_session: {
        color: 'var(--gdg-blue)',
        colorHex: '#4285F4',
        bgColor: 'var(--gdg-blue-ambient)',
        icon: 'info',
        label: 'Bilgilendirme'
    },
    design: {
        color: '#9C27B0',
        colorHex: '#9C27B0',
        bgColor: 'rgba(156, 39, 176, 0.15)',
        icon: 'palette',
        label: 'Tasarım'
    }
};

// Format date for display
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

// Check if event is upcoming
function isUpcoming(dateString) {
    const eventDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return eventDate >= today;
}

// Calculate registration progress
function getRegistrationProgress(registered, spots) {
    return Math.min((registered / spots) * 100, 100);
}

// Create event card element
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
                        <span class="capacity-text">${spotsLeft > 0 ? `${spotsLeft} kişilik yer kaldı` : 'Dolu'}</span>
                    </div>
                    
                    ${upcoming ? `
                        <a href="#" class="btn btn-primary btn-sm event-register">
                            <span class="material-symbols-outlined">how_to_reg</span>
                            Kayıt Ol
                        </a>
                    ` : `
                        <span class="event-past-badge">
                            <span class="material-symbols-outlined">check_circle</span>
                            Tamamlandı
                        </span>
                    `}
                </div>
            </div>
        </div>
    `;
    
    return eventCard;
}

// Filter and render events
function renderEvents(category = 'all', timeFilter = 'upcoming') {
    const eventsGrid = document.getElementById('eventsGrid');
    const noEventsMessage = document.getElementById('noEventsMessage');
    
    if (!eventsGrid) return;
    
    // Clear existing events
    eventsGrid.innerHTML = '';
    
    // Filter events
    let filteredEvents = events.filter(event => {
        const categoryMatch = category === 'all' || event.category === category;
        const timeMatch = timeFilter === 'upcoming' ? isUpcoming(event.date) : !isUpcoming(event.date);
        return categoryMatch && timeMatch;
    });
    
    // Sort events by date
    filteredEvents.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return timeFilter === 'upcoming' ? dateA - dateB : dateB - dateA;
    });
    
    // Show/hide no events message
    if (filteredEvents.length === 0) {
        noEventsMessage.style.display = 'flex';
        eventsGrid.style.display = 'none';
    } else {
        noEventsMessage.style.display = 'none';
        eventsGrid.style.display = 'grid';
        
        // Render event cards with staggered animation
        filteredEvents.forEach((event, index) => {
            const card = createEventCard(event);
            card.style.animationDelay = `${index * 0.1}s`;
            eventsGrid.appendChild(card);
        });
    }
}

// Initialize filters
function initializeFilters() {
    const categoryTabs = document.querySelectorAll('.filter-tab');
    const toggleBtns = document.querySelectorAll('.toggle-btn');
    
    let currentCategory = 'all';
    let currentTimeFilter = 'upcoming';
    // create sliding underline
    const tabsWrapper = document.querySelector('.filter-tabs');
    let underline = null;
    if (tabsWrapper) {
        underline = document.createElement('div');
        underline.className = 'filter-underline';
        tabsWrapper.appendChild(underline);
    }

    function moveUnderlineTo(tab) {
        if (!underline || !tab) return;
        const left = tab.offsetLeft;
        const width = tab.offsetWidth;
        underline.style.left = `${left}px`;
        underline.style.width = `${width}px`;
    }
    
    // helper: animate grid then render
    const eventsGrid = document.getElementById('eventsGrid');
    function animateAndRender(category, timeFilter) {
        if (!eventsGrid) return renderEvents(category, timeFilter);
        // exit animation
        eventsGrid.classList.add('is-exiting');
        // after exit, render new content and play enter animation
        setTimeout(() => {
            renderEvents(category, timeFilter);
            eventsGrid.classList.remove('is-exiting');
            eventsGrid.classList.add('is-entering');
            // force repaint then activate
            requestAnimationFrame(() => {
                eventsGrid.classList.add('active');
                // remove entering classes after animation
                setTimeout(() => {
                    eventsGrid.classList.remove('is-entering');
                    eventsGrid.classList.remove('active');
                }, 360);
            });
        }, 240);
    }

    // Category filter handlers
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentCategory = tab.dataset.category;
            // move underline immediately
            moveUnderlineTo(tab);
            animateAndRender(currentCategory, currentTimeFilter);
        });
    });
    
    // Time filter handlers
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            toggleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentTimeFilter = btn.dataset.filter;
            animateAndRender(currentCategory, currentTimeFilter);
        });
    });

    // position underline on load and on resize
    window.addEventListener('load', () => {
        const active = document.querySelector('.filter-tab.active');
        if (active) moveUnderlineTo(active);
    });
    window.addEventListener('resize', () => {
        const active = document.querySelector('.filter-tab.active');
        if (active) moveUnderlineTo(active);
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    renderEvents('all', 'upcoming');
    initializeFilters();
    initializeModal();
});

// ==================== //
// Modal Functionality  //
// ==================== //

function openEventModal(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;
    
    const modal = document.getElementById('eventModal');
    const modalContent = document.getElementById('modalContent');
    
    const config = categoryConfig[event.category] || categoryConfig.tech_talk;
    const dateInfo = formatDate(event.date);
    const upcoming = isUpcoming(event.date);
    const progress = getRegistrationProgress(event.registered, event.spots);
    const spotsLeft = event.spots - event.registered;
    
    modalContent.innerHTML = `
        <div class="modal-header">
            ${event.image ? `<img src="${event.image}" alt="${event.title}" class="modal-header-image">` : ''}
            <div class="modal-header-overlay"></div>
            <div class="modal-header-content">
                <div class="modal-category-badge" style="background: ${config.colorHex};">
                    <span class="material-symbols-outlined">${config.icon}</span>
                    ${config.label}
                </div>
                <h2 class="modal-title">${event.title}</h2>
            </div>
        </div>
        
        <div class="modal-body">
            <div class="modal-meta-grid">
                <div class="modal-meta-item">
                    <div class="modal-meta-icon" style="background: ${config.colorHex};">
                        <span class="material-symbols-outlined">calendar_month</span>
                    </div>
                    <div class="modal-meta-text">
                        <span class="modal-meta-label">Tarih</span>
                        <span class="modal-meta-value">${dateInfo.full}</span>
                    </div>
                </div>
                <div class="modal-meta-item">
                    <div class="modal-meta-icon" style="background: var(--gdg-green);">
                        <span class="material-symbols-outlined">schedule</span>
                    </div>
                    <div class="modal-meta-text">
                        <span class="modal-meta-label">Saat</span>
                        <span class="modal-meta-value">${event.time}</span>
                    </div>
                </div>
                <div class="modal-meta-item">
                    <div class="modal-meta-icon" style="background: var(--gdg-red);">
                        <span class="material-symbols-outlined">location_on</span>
                    </div>
                    <div class="modal-meta-text">
                        <span class="modal-meta-label">Konum</span>
                        <span class="modal-meta-value">${event.location}</span>
                    </div>
                </div>
                <div class="modal-meta-item">
                    <div class="modal-meta-icon" style="background: var(--gdg-yellow);">
                        <span class="material-symbols-outlined">group</span>
                    </div>
                    <div class="modal-meta-text">
                        <span class="modal-meta-label">Organizatör</span>
                        <span class="modal-meta-value">${event.organizer}</span>
                    </div>
                </div>
            </div>
            
            <div class="modal-section">
                <h3 class="modal-section-title">
                    <span class="material-symbols-outlined">description</span>
                    Etkinlik Hakkında
                </h3>
                <p class="modal-description">${event.description}</p>
            </div>
            
            ${event.details && event.details.length > 0 ? `
                <div class="modal-section">
                    <h3 class="modal-section-title">
                        <span class="material-symbols-outlined">checklist</span>
                        Neler Öğreneceksiniz
                    </h3>
                    <ul class="modal-details-list">
                        ${event.details.map(detail => `<li>${detail}</li>`).join('')}
                    </ul>
                </div>
            ` : ''}
            
            ${event.speakers && event.speakers.length > 0 ? `
                <div class="modal-section">
                    <h3 class="modal-section-title">
                        <span class="material-symbols-outlined">record_voice_over</span>
                        Konuşmacılar
                    </h3>
                    <div class="modal-speakers-grid">
                        ${event.speakers.map(speaker => `
                            <div class="modal-speaker-tag">
                                <span class="material-symbols-outlined">person</span>
                                ${speaker}
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
            
            ${event.tags && event.tags.length > 0 ? `
                <div class="modal-section">
                    <h3 class="modal-section-title">
                        <span class="material-symbols-outlined">sell</span>
                        Etiketler
                    </h3>
                    <div class="modal-tags">
                        ${event.tags.map(tag => `<span class="modal-tag">#${tag}</span>`).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
        
        <div class="modal-footer">
            <div class="modal-capacity">
                <div class="modal-capacity-header">
                    <span class="modal-capacity-label">Kayıt Durumu</span>
                    <span class="modal-capacity-value">${event.registered} / ${event.spots} kayıtlı</span>
                </div>
                <div class="modal-capacity-bar">
                    <div class="modal-capacity-fill" style="width: ${progress}%; background: ${config.colorHex};"></div>
                </div>
            </div>
            
            ${upcoming ? `
                <a href="#" class="btn btn-primary modal-register-btn">
                    <span class="material-symbols-outlined">how_to_reg</span>
                    Şimdi Kayıt Ol
                </a>
            ` : `
                <span class="modal-past-badge">
                    <span class="material-symbols-outlined">check_circle</span>
                    Etkinlik Tamamlandı
                </span>
            `}
        </div>
    `;
    
    // Toggle fullscreen image mode if event has an image
    if (event.image) {
        modal.classList.add('image-fullscreen');
    } else {
        modal.classList.remove('image-fullscreen');
    }

    // Show modal with animation
    modal.classList.add('active');
    document.body.classList.add('modal-open');
}

function closeEventModal() {
    const modal = document.getElementById('eventModal');
    modal.classList.remove('active');
    modal.classList.remove('image-fullscreen');
    document.body.classList.remove('modal-open');
}

function initializeModal() {
    const modal = document.getElementById('eventModal');
    const closeBtn = document.getElementById('modalClose');
    
    // Close button handler
    closeBtn.addEventListener('click', closeEventModal);
    
    // Click outside to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeEventModal();
        }
    });
    
    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeEventModal();
        }
    });
    
    // Event delegation for card clicks
    document.getElementById('eventsGrid').addEventListener('click', (e) => {
        const card = e.target.closest('.event-card');
        if (card) {
            // Don't open modal if clicking on register button
            if (e.target.closest('.event-register')) {
                return;
            }
            const eventId = card.getAttribute('data-event-id');
            openEventModal(eventId);
        }
    });
}