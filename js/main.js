// global theme toggle logic 
document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleIcon = document.getElementById('themeToggleIcon');

    const setTheme = (theme) => {
        html.setAttribute('data-color-scheme', theme);
        localStorage.setItem('theme', theme);

        if (themeToggleIcon) {
            themeToggleIcon.textContent = theme === 'dark' ? 'light_mode' : 'dark_mode';
        }

        document.dispatchEvent(new CustomEvent('themechange', { detail: theme }));
    };

    const savedTheme = localStorage.getItem('theme') || html.getAttribute('data-color-scheme') || 'light';
    setTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-color-scheme');
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(nextTheme);
        });
    }
});
