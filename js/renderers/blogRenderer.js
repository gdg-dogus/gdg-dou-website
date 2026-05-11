// Blog page renderer - follows the pattern from offersRenderer.js
import { blogData } from '../data/blogData.js';
import { mediumConfig } from '../data/mediumConfig.js';
import { fetchMultipleMediumFeeds } from '../utils/mediumFetcher.js';
import { observeVisibility } from '../utils/observer.js';
import { getLocale, getLocalizedItem, t } from '../translations.js';

const initBlogPage = () => {
    const blogGrid = document.getElementById('blogGrid');
    const searchInput = document.getElementById('blogSearch');
    const categoryFilters = document.getElementById('categoryFilters');
    const sourceFilters = document.getElementById('sourceFilters');
    const modalOverlay = document.getElementById('blogModalOverlay');
    const modalClose = document.getElementById('blogModalClose');
    const modalReadOnMedium = document.getElementById('modalReadOnMedium');
    const mediumProfileCta = document.getElementById('mediumProfileCta');

    const modalCategory = document.getElementById('modalCategory');
    const modalTitle = document.getElementById('modalTitle');
    const modalAuthor = document.getElementById('modalAuthor');
    const modalDate = document.getElementById('modalDate');
    const modalReadTime = document.getElementById('modalReadTime');
    const modalContent = document.getElementById('modalContent');

    const shareTwitter = document.getElementById('shareTwitter');
    const shareLinkedin = document.getElementById('shareLinkedin');
    const copyLink = document.getElementById('copyLink');

    let currentCategory = 'all';
    let currentSource = 'all';
    let searchQuery = '';
    let currentModalPost = null;
    let mediumPosts = [];
    let allPosts = [];
    let previousBodyOverflow = '';

    let cachedFilterTags = null;
    let cachedSourceTags = null;

    const blogUrlParam = 'blogId';

    if (mediumProfileCta && mediumConfig.profileUrl) {
        mediumProfileCta.href = mediumConfig.profileUrl;
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString(getLocale(), options);
    }

    function localizePost(post) {
        if (post.source !== 'medium') {
            return getLocalizedItem(post);
        }

        const readTime = getLocale() === 'en-US'
            ? post.readTime.replace(/\s*dk$/, ' min')
            : post.readTime.replace(/\s*min$/, ' dk');
        const title = getLocale() === 'en-US' && post.title === 'Başlıksız'
            ? t('blogPage.untitled')
            : post.title;

        return { ...post, title, readTime };
    }

    function getPostUrl(post) {
        const url = new URL(window.location.href);
        url.searchParams.set(blogUrlParam, post.id);
        return url.toString();
    }

    function setPostUrl(post) {
        const nextUrl = getPostUrl(post);
        if (nextUrl !== window.location.href) {
            history.pushState({ blogId: post.id }, '', nextUrl);
        }
    }

    function clearPostUrl() {
        const url = new URL(window.location.href);
        if (!url.searchParams.has(blogUrlParam)) return;

        url.searchParams.delete(blogUrlParam);
        history.pushState({}, '', url.toString());
    }

    function findPostById(postId) {
        return allPosts.find(post => post.id === postId);
    }

    function openPostFromUrl() {
        const postId = new URLSearchParams(window.location.search).get(blogUrlParam);
        if (!postId) return false;

        const post = findPostById(postId);
        if (!post) return false;

        openModal(post, { updateUrl: false });
        return true;
    }

    function mergeAllPosts() {
        const localPosts = blogData.map(post => ({ ...post, source: 'local' }));
        const combined = [...localPosts, ...mediumPosts];
        combined.sort((a, b) => new Date(b.date) - new Date(a.date));
        allPosts = combined;
    }

    async function loadMediumArticles() {
        showLoadingIndicator();

        try {
            mediumPosts = await fetchMultipleMediumFeeds(mediumConfig.feeds, {
                maxArticles: mediumConfig.maxArticles,
                cacheDuration: mediumConfig.cacheDuration,
                fallbackImage: mediumConfig.fallbackImage
            });
            mergeAllPosts();
            renderBlogs();
            openPostFromUrl();
        } catch (err) {
            console.error('Medium articles failed to load:', err);
        } finally {
            hideLoadingIndicator();
        }
    }

    function showLoadingIndicator() {
        const existing = document.getElementById('mediumLoading');
        if (existing) return;

        const loader = document.createElement('div');
        loader.id = 'mediumLoading';
        loader.className = 'blog-loading';
        loader.innerHTML = `<div class="loading-spinner"></div><span>${t('blogPage.loadingMedium')}</span>`;
        blogGrid.appendChild(loader);
    }

    function hideLoadingIndicator() {
        const loader = document.getElementById('mediumLoading');
        if (loader) loader.remove();
    }

    function renderBlogs() {
        blogGrid.innerHTML = '';

        const filteredBlogs = allPosts.filter(post => {
            const localizedPost = localizePost(post);
            const categoryKey = post.categoryKey || post.category;
            const matchesSource = currentSource === 'all' || post.source === currentSource;
            const matchesCategory = currentCategory === 'all' || categoryKey === currentCategory;
            const matchesSearch =
                localizedPost.title.toLowerCase().includes(searchQuery) ||
                localizedPost.excerpt.toLowerCase().includes(searchQuery) ||
                post.author.toLowerCase().includes(searchQuery) ||
                localizedPost.tags.some(tag => tag.toLowerCase().includes(searchQuery));
            return matchesSource && matchesCategory && matchesSearch;
        });

        if (filteredBlogs.length === 0) {
            blogGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 60px; color: var(--color-text-secondary); animation: fadeInUp 0.5s ease;">
                    <span class="material-symbols-outlined" style="font-size: 64px; margin-bottom: 24px; opacity: 0.5;">search_off</span>
                    <p style="font-size: 18px;">${t('blogPage.empty')}</p>
                </div>
            `;
            return;
        }

        filteredBlogs.forEach((post, index) => {
            const localizedPost = localizePost(post);
            const card = document.createElement('div');
            card.className = 'blog-card';
            card.dataset.delay = index;

            const sourceBadge = post.source === 'medium'
                ? `<span class="blog-card-source source-medium">${t('blogPage.filters.medium')}</span>`
                : `<span class="blog-card-source source-local">${t('blogPage.filters.local')}</span>`;

            card.innerHTML = `
                <div class="blog-card-inner">
                    <div class="blog-cover-wrapper">
                        <img src="${localizedPost.coverImage}" alt="${localizedPost.title}" class="blog-cover" loading="lazy" decoding="async">
                        ${sourceBadge}
                    </div>
                    <div class="blog-content">
                        <span class="blog-category">${localizedPost.category}</span>
                        <h3 class="blog-title">${localizedPost.title}</h3>
                        <p class="blog-excerpt">${localizedPost.excerpt}</p>
                        <div class="blog-tags">
                            ${localizedPost.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                        </div>
                        <div class="blog-meta">
                            <div class="blog-meta-item">
                                <span class="material-symbols-outlined">person</span>
                                <span>${post.author}</span>
                            </div>
                            <div class="blog-meta-item">
                                <span class="material-symbols-outlined">schedule</span>
                                <span>${localizedPost.readTime}</span>
                            </div>
                        </div>
                        <button class="btn btn-outline btn-read" type="button">
                            ${t('blogPage.readArticle')}
                            <span class="material-symbols-outlined">arrow_forward</span>
                        </button>
                    </div>
                </div>
            `;

            card.addEventListener('click', () => openModal(post));
            blogGrid.appendChild(card);
            observeVisibility(card);
        });
    }

    function openModal(post, { updateUrl = true } = {}) {
        const wasActive = modalOverlay.classList.contains('active');
        currentModalPost = post;
        const localizedPost = localizePost(post);

        modalCategory.textContent = localizedPost.category;
        modalTitle.textContent = localizedPost.title;
        modalAuthor.textContent = post.author;
        modalDate.textContent = formatDate(post.date);
        modalReadTime.textContent = localizedPost.readTime;
        modalContent.innerHTML = localizedPost.content;

        if (post.source === 'medium' && post.link) {
            modalReadOnMedium.href = post.link;
            modalReadOnMedium.style.display = 'inline-flex';
        } else {
            modalReadOnMedium.style.display = 'none';
        }

        modalOverlay.classList.add('active');

        if (!wasActive) {
            previousBodyOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
        }

        if (updateUrl) {
            setPostUrl(post);
        }
    }

    function closeModal({ updateUrl = true } = {}) {
        const wasActive = modalOverlay.classList.contains('active');
        modalOverlay.classList.remove('active');

        if (wasActive) {
            document.body.style.overflow = previousBodyOverflow;
            previousBodyOverflow = '';
        }

        currentModalPost = null;

        if (updateUrl) {
            clearPostUrl();
        }
    }

    function getShareUrl() {
        return currentModalPost
            ? getPostUrl(currentModalPost)
            : window.location.href;
    }

    function shareOnTwitter() {
        if (!currentModalPost) return;
        const text = encodeURIComponent(localizePost(currentModalPost).title);
        const url = encodeURIComponent(getShareUrl());
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    }

    function shareOnLinkedin() {
        if (!currentModalPost) return;
        const title = localizePost(currentModalPost).title;
        const text = encodeURIComponent(`${title}\n${getShareUrl()}`);
        window.open(`https://www.linkedin.com/feed/?shareActive=true&text=${text}`, '_blank');
    }

    function copyToClipboard() {
        const url = getShareUrl();
        navigator.clipboard.writeText(url).then(() => {
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

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        renderBlogs();
    });

    categoryFilters.addEventListener('click', (e) => {
        const tag = e.target.closest('.filter-tag');
        if (tag) {
            if (!cachedFilterTags) {
                cachedFilterTags = categoryFilters.querySelectorAll('.filter-tag');
            }
            cachedFilterTags.forEach(btn => btn.classList.remove('active'));
            tag.classList.add('active');

            currentCategory = tag.dataset.category;
            renderBlogs();
        }
    });

    sourceFilters.addEventListener('click', (e) => {
        const tag = e.target.closest('.source-tag');
        if (!tag) return;

        if (!cachedSourceTags) {
            cachedSourceTags = sourceFilters.querySelectorAll('.source-tag');
        }
        cachedSourceTags.forEach(btn => btn.classList.remove('active'));
        tag.classList.add('active');

        currentSource = tag.dataset.source;
        renderBlogs();
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

    shareTwitter.addEventListener('click', shareOnTwitter);
    shareLinkedin.addEventListener('click', shareOnLinkedin);
    copyLink.addEventListener('click', copyToClipboard);

    window.addEventListener('popstate', () => {
        if (openPostFromUrl()) return;
        if (modalOverlay.classList.contains('active')) {
            closeModal({ updateUrl: false });
        }
    });

    mergeAllPosts();
    renderBlogs();
    openPostFromUrl();
    loadMediumArticles();

    document.addEventListener('languagechange', () => {
        mergeAllPosts();
        renderBlogs();
        if (currentModalPost && modalOverlay.classList.contains('active')) {
            openModal(currentModalPost, { updateUrl: false });
        }
    });
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initBlogPage);
} else {
    initBlogPage();
}
