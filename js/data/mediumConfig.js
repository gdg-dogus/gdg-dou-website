/*
How to connect Medium accounts to the Blog page:
1. Add each public Medium profile or publication URL to feeds.
2. The site automatically converts normal Medium URLs into RSS feed URLs.
3. maxArticles is the total number of Medium posts shown after all feeds are merged.
4. cacheDuration is in milliseconds. 30 * 60 * 1000 means 30 minutes.
5. fallbackImage is used when a Medium post has no image.
6. Live Medium post content is displayed as Medium provides it; it is not manually translated here.

Examples:
feeds: [
    'https://medium.com/@gdscdogus',
    'https://medium.com/@anotherwriter',
    'https://medium.com/example-publication'
]
*/
export const mediumConfig = {
    feeds: [
        'https://medium.com/@gdscdogus',
        'https://medium.com/@muratcanates'
    ],
    maxArticles: 10,
    cacheDuration: 30 * 60 * 1000,
    fallbackImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
    profileUrl: 'https://medium.com/@gdscdogus'
};
