import { translations } from "./translations.js";

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

// translation toggle logic
document.addEventListener('DOMContentLoaded', () => {
    const html = document.documentElement;
    const translateToggle = document.getElementById('translateToggle');

    const setLanguage = (lang) => {
        localStorage.setItem("lang", lang);
        html.setAttribute("data-lang", lang);
    };

    const savedLang = localStorage.getItem("lang") || "tr";
    html.setAttribute("data-lang", savedLang);

    if (translateToggle) {
        translateToggle.addEventListener("click", () => {
            const current = html.getAttribute("data-lang") || "tr";
            const next = current === "tr" ? "en" : "tr";
            setLanguage(next);

            window.location.reload();
        });
    }

    document.querySelectorAll("[data-key]").forEach(el => {
        const key = el.getAttribute("data-key");
        const parentSpan = el.querySelector(".brand-text");

        if (parentSpan) {
            parentSpan.textContent = translations[savedLang][key];
        } else {
            el.innerHTML = translations[savedLang][key];
        }
    });
});