// Blog page renderer - follows the pattern from offersRenderer.js
import { blogData } from '../data/blogData.js';
import { observeVisibility } from '../utils/observer.js';

const initBlogPage = () => {
    // DOM elements
    const blogGrid = document.getElementById('blogGrid');
    const searchInput = document.getElementById('blogSearch');
    const categoryFilters = document.getElementById('categoryFilters');
    const modalOverlay = document.getElementById('blogModalOverlay');
    const modalClose = document.getElementById('blogModalClose');

    // Modal content elements
    const modalCategory = document.getElementById('modalCategory');
    const modalTitle = document.getElementById('modalTitle');
    const modalAuthor = document.getElementById('modalAuthor');
    const modalDate = document.getElementById('modalDate');
    const modalReadTime = document.getElementById('modalReadTime');
    const modalContent = document.getElementById('modalContent');

    // Share buttons
    const shareTwitter = document.getElementById('shareTwitter');
    const shareLinkedin = document.getElementById('shareLinkedin');
    const copyLink = document.getElementById('copyLink');

    // State management
    let currentCategory = 'all';
    let searchQuery = '';
    let currentModalPost = null;
    
    // Cache filter tag elements
    let cachedFilterTags = null;

    /**
     * Format date to Turkish locale
     */
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('tr-TR', options);
    }

    /**
     * Render all blog posts based on filters
     */
    function renderBlogs() {
        blogGrid.innerHTML = '';

        // Filter blogs by category and search query
        const filteredBlogs = blogData.filter(post => {
            const matchesCategory = currentCategory === 'all' || post.category === currentCategory;
            const matchesSearch =
                post.title.toLowerCase().includes(searchQuery) ||
                post.excerpt.toLowerCase().includes(searchQuery) ||
                post.author.toLowerCase().includes(searchQuery) ||
                post.tags.some(tag => tag.toLowerCase().includes(searchQuery));
            return matchesCategory && matchesSearch;
        });

        // Show empty state if no results
        if (filteredBlogs.length === 0) {
            blogGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 60px; color: var(--color-text-secondary); animation: fadeInUp 0.5s ease;">
                    <span class="material-symbols-outlined" style="font-size: 64px; margin-bottom: 24px; opacity: 0.5;">search_off</span>
                    <p style="font-size: 18px;">Bu kriterlere uygun blog yazısı bulunamadı.</p>
                </div>
            `;
            return;
        }

        // Render each blog card
        filteredBlogs.forEach((post, index) => {
            const card = document.createElement('div');
            card.className = 'blog-card';
            card.dataset.delay = index;

            card.innerHTML = `
                <div class="blog-cover-wrapper">
                    <img src="${post.coverImage}" alt="${post.title}" class="blog-cover" loading="lazy" decoding="async">
                </div>
                <div class="blog-content">
                    <span class="blog-category">${post.category}</span>
                    <h3 class="blog-title">${post.title}</h3>
                    <p class="blog-excerpt">${post.excerpt}</p>
                    <div class="blog-tags">
                        ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="blog-meta">
                        <div class="blog-meta-item">
                            <span class="material-symbols-outlined">person</span>
                            <span>${post.author}</span>
                        </div>
                        <div class="blog-meta-item">
                            <span class="material-symbols-outlined">schedule</span>
                            <span>${post.readTime}</span>
                        </div>
                    </div>
                    <button class="btn btn-outline btn-read" type="button">
                        Yazıyı Oku
                        <span class="material-symbols-outlined">arrow_forward</span>
                    </button>
                </div>
            `;

            // Click handler to open modal
            card.addEventListener('click', () => openModal(post));
            blogGrid.appendChild(card);

            // Trigger fade-in animation using shared observer
            observeVisibility(card);
        });
    }

    /**
     * Open blog detail modal
     */
    function openModal(post) {
        currentModalPost = post;
        
        // Populate modal with blog data
        modalCategory.textContent = post.category;
        modalTitle.textContent = post.title;
        modalAuthor.textContent = post.author;
        modalDate.textContent = formatDate(post.date);
        modalReadTime.textContent = post.readTime;
        modalContent.innerHTML = post.content;

        // Show modal
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Close modal
     */
    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        currentModalPost = null;
    }

    /**
     * Share on Twitter
     */
    function shareOnTwitter() {
        if (!currentModalPost) return;
        const text = encodeURIComponent(currentModalPost.title);
        const url = encodeURIComponent(window.location.href);
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    }

    /**
     * Share on LinkedIn
     */
    function shareOnLinkedin() {
        if (!currentModalPost) return;
        const url = encodeURIComponent(window.location.href);
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    }

    /**
     * Copy link to clipboard
     */
    function copyToClipboard() {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            // Visual feedback
            const btn = copyLink;
            const originalHTML = btn.innerHTML;
            btn.innerHTML = '<span class="material-symbols-outlined">check</span>';
            setTimeout(() => {
                btn.innerHTML = originalHTML;
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy link:', err);
        });
    }

    // Event listeners

    // Search input
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        renderBlogs();
    });

    // Category filter buttons
    categoryFilters.addEventListener('click', (e) => {
        if (e.target.classList.contains('filter-tag')) {
            // Use cached filter tags or query once
            if (!cachedFilterTags) {
                cachedFilterTags = categoryFilters.querySelectorAll('.filter-tag');
            }
            cachedFilterTags.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            // Update category and re-render
            currentCategory = e.target.dataset.category;
            renderBlogs();
        }
    });

    // Modal close button
    modalClose.addEventListener('click', closeModal);

    // Close modal on overlay click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // Share button handlers
    shareTwitter.addEventListener('click', shareOnTwitter);
    shareLinkedin.addEventListener('click', shareOnLinkedin);
    copyLink.addEventListener('click', copyToClipboard);

    // Initial render
    renderBlogs();
};

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlogPage);
} else {
    initBlogPage();
}
