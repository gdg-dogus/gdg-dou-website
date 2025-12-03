import { stats } from "../data/statsData.js";
import { collabs } from "../data/collabsData.js";
import { observeVisibility, observeCounter, initOrbVisibilityControl, initPageVisibilityControl } from "../utils/observer.js";

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

    // Observe each card for animation using shared observer
    document.querySelectorAll('.stat-card').forEach(card => {
        observeVisibility(card);
        
        // Also observe for counter animation (needs 50% visibility)
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
        
        // Ease out
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

// Cache logo elements for theme switching
let cachedLogoElements = null;

const applyThemeToCollabs = (theme = getCurrentTheme()) => {
    // Use cached elements or query once
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

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderCollabs();
    applyThemeToCollabs();
    
    // Initialize orb visibility control for performance
    initOrbVisibilityControl();
    initPageVisibilityControl();
    
    // Reset logo cache on theme change
    document.addEventListener('themechange', (event) => {
        cachedLogoElements = null; // Reset cache in case DOM changed
        applyThemeToCollabs(event.detail || getCurrentTheme());
    });
});
