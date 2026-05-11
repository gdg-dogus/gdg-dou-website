const API_BASE = 'https://api.rss2json.com/v1/api.json';

let cache = { data: null, timestamp: 0 };

function toFeedUrl(mediumUrl) {
    const url = new URL(mediumUrl);
    if (!url.pathname.includes('/feed/')) {
        url.pathname = '/feed' + url.pathname;
    }
    return url.toString();
}

function extractImage(html) {
    if (!html) return null;
    const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
    return match ? match[1] : null;
}

function estimateReadTime(html) {
    if (!html) return '1 dk';
    const text = html.replace(/<[^>]*>/g, '');
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(words / 200));
    return `${minutes} dk`;
}

function createExcerpt(html, maxLength = 160) {
    if (!html) return '';
    const text = html.replace(/<[^>]*>/g, '').trim();
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).replace(/\s+\S*$/, '') + '...';
}

function sanitizeHtml(html) {
    if (!html) return '';
    return html
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
        .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
        .replace(/on\w+="[^"]*"/gi, '')
        .replace(/on\w+='[^']*'/gi, '');
}

function extractTags(item) {
    if (item.categories && item.categories.length > 0) {
        return item.categories.slice(0, 4);
    }
    return ['Medium'];
}

function mapItemToPost(item, fallbackImage) {
    const thumbnail = item.thumbnail || extractImage(item.content || item.description) || fallbackImage;
    const content = sanitizeHtml(item.content || item.description || '');
    const excerpt = item.description
        ? createExcerpt(item.description)
        : createExcerpt(item.content);

    return {
        id: 'medium-' + (item.guid || item.link || '').replace(/[^a-zA-Z0-9]/g, '-').substring(0, 60),
        title: item.title || 'Başlıksız',
        category: 'Medium',
        author: item.author || 'GDG on Campus DOU',
        authorImage: item.enclosure?.link || null,
        date: item.pubDate ? item.pubDate.split(' ')[0] : new Date().toISOString().split('T')[0],
        readTime: estimateReadTime(item.content || item.description),
        coverImage: thumbnail,
        excerpt,
        content,
        tags: extractTags(item),
        link: item.link || '#',
        source: 'medium'
    };
}

export async function fetchMediumArticles(mediumUrl, { maxArticles = 10, fallbackImage = '' } = {}) {
    const feedUrl = toFeedUrl(mediumUrl);
    const apiUrl = `${API_BASE}?rss_url=${encodeURIComponent(feedUrl)}`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error(`Medium feed fetch failed: ${response.status}`);
    }

    const data = await response.json();
    if (data.status !== 'ok' || !data.items) {
        throw new Error('Invalid RSS response');
    }

    return data.items
        .slice(0, maxArticles)
        .map(item => mapItemToPost(item, fallbackImage));
}

export async function fetchMultipleMediumFeeds(urls, { maxArticles = 10, cacheDuration = 30 * 60 * 1000, fallbackImage = '' } = {}) {
    if (cache.data && (Date.now() - cache.timestamp) < cacheDuration) {
        return cache.data;
    }

    const results = await Promise.allSettled(
        urls.map(url => fetchMediumArticles(url, { maxArticles, fallbackImage }))
    );

    const articles = results
        .filter(result => result.status === 'fulfilled')
        .flatMap(result => result.value)
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, maxArticles);

    cache = { data: articles, timestamp: Date.now() };

    return articles;
}
