import { offersData } from '../data/offersData.js';

const initOffersPage = () => {
    const offersGrid = document.getElementById('offersGrid');
    const searchInput = document.getElementById('offerSearch');
    const categoryFilters = document.getElementById('categoryFilters');
    const modalOverlay = document.getElementById('offerModalOverlay');
    const modalClose = document.getElementById('offerModalClose');

    const modalLogo = document.getElementById('modalLogo');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalDescription = document.getElementById('modalDescription');
    const modalClaimSteps = document.getElementById('modalClaimSteps');
    const modalLink = document.getElementById('modalLink');

    let currentCategory = 'all';
    let searchQuery = '';
    let currentModalOffer = null;

    const observer = 'IntersectionObserver' in window
        ? new IntersectionObserver((entries, observerRef) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observerRef.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        })
        : null;

    const getCurrentTheme = () =>
        document.documentElement.getAttribute('data-color-scheme') ||
        localStorage.getItem('theme') ||
        'light';

    const getLogoForTheme = (offer, theme = getCurrentTheme()) => {
        if (theme === 'dark' && offer.darkLogo) {
            return offer.darkLogo;
        }
        return offer.logo;
    };

    function applyThemeToLogos(theme = getCurrentTheme()) {
        document.querySelectorAll('.offer-logo').forEach(img => {
            const light = img.dataset.logoLight;
            const dark = img.dataset.logoDark || light;
            if (!light) return;
            img.src = theme === 'dark' ? dark : light;
        });

        if (currentModalOffer && modalOverlay.classList.contains('active')) {
            modalLogo.src = getLogoForTheme(currentModalOffer, theme);
        }
    }

    function renderOffers() {
        offersGrid.innerHTML = '';

        const filteredOffers = offersData.filter(offer => {
            const matchesCategory = currentCategory === 'all' || offer.category === currentCategory;
            const matchesSearch =
                offer.name.toLowerCase().includes(searchQuery) ||
                offer.shortDescription.toLowerCase().includes(searchQuery) ||
                offer.tags.some(tag => tag.toLowerCase().includes(searchQuery));
            return matchesCategory && matchesSearch;
        });

        if (filteredOffers.length === 0) {
            offersGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 60px; color: var(--color-text-secondary); animation: fadeInUp 0.5s ease;">
                    <span class="material-symbols-outlined" style="font-size: 64px; margin-bottom: 24px; opacity: 0.5;">search_off</span>
                    <p style="font-size: 18px;">Bu kriterlere uygun teklif bulunamadı.</p>
                </div>
            `;
            return;
        }

        const themeForRender = getCurrentTheme();

        filteredOffers.forEach((offer, index) => {
            const card = document.createElement('div');
            card.className = 'offer-card';
            const cardDelay = index * 80;
            card.style.transitionDelay = `${cardDelay}ms`;
            setTimeout(() => {
                card.style.transitionDelay = '';
            }, cardDelay + 600);

            const logoSrc = getLogoForTheme(offer, themeForRender);

            card.innerHTML = `
                <img src="${logoSrc}" alt="${offer.name}" class="offer-logo" data-offer-id="${offer.id}">
                <div class="offer-content">
                    <h3 class="offer-title">${offer.name}</h3>
                    <p class="offer-desc">${offer.shortDescription}</p>
                    <div class="offer-tags">
                        ${offer.tags.map(tag => `<span class="offer-tag">${tag}</span>`).join('')}
                    </div>
                    <button class="btn btn-outline btn-offer" type="button">
                        Teklifi Görüntüle
                        <span class="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>
            `;

            const logoEl = card.querySelector('.offer-logo');
            logoEl.dataset.logoLight = offer.logo;
            logoEl.dataset.logoDark = offer.darkLogo || offer.logo;

            card.addEventListener('click', () => openModal(offer));
            offersGrid.appendChild(card);

            if (observer) {
                observer.observe(card);
                // Fallback just in case observer doesn't trigger
                setTimeout(() => card.classList.add('is-visible'), 500);
            } else {
                card.classList.add('is-visible');
            }
        });
    }

    function openModal(offer) {
        currentModalOffer = offer;
        modalLogo.src = getLogoForTheme(offer);
        modalTitle.textContent = offer.name;
        modalCategory.textContent = offer.category;
        modalDescription.textContent = offer.fullDescription;
        modalLink.href = offer.link;

        modalClaimSteps.innerHTML = '';
        offer.claimGuide.forEach(step => {
            const li = document.createElement('li');
            li.innerHTML = step;
            modalClaimSteps.appendChild(li);
        });

        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        currentModalOffer = null;
    }

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        renderOffers();
    });

    categoryFilters.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-tag')) {
            document.querySelectorAll('.filter-tag').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            currentCategory = e.target.dataset.category;
            renderOffers();
        }
    });

    modalClose.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    renderOffers();
    applyThemeToLogos();

    document.addEventListener('themechange', (event) => {
        applyThemeToLogos(event.detail || getCurrentTheme());
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initOffersPage);
} else {
    initOffersPage();
}
