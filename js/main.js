import { translations } from "./translations.js";

const loadComponent = async (selector, path) => {
    const placeholder = document.querySelector(selector);
    if (!placeholder) return null;

    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`Failed to load ${path}`);

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const fragment = document.createDocumentFragment();
        
        while (doc.body.firstChild) {
            fragment.appendChild(doc.body.firstChild);
        }
        
        placeholder.replaceWith(fragment);
    } catch (error) {
        console.error(error);
    }
};

const initializeThemeToggle = () => {
    const html = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");
    const themeToggleIcon = document.getElementById("themeToggleIcon");

    const setTheme = (theme) => {
        html.setAttribute("data-color-scheme", theme);
        localStorage.setItem("theme", theme);

        if (themeToggleIcon) {
            themeToggleIcon.textContent = theme === "dark" ? "light_mode" : "dark_mode";
        }

        document.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
    };

    const savedTheme = localStorage.getItem("theme") || html.getAttribute("data-color-scheme") || "light";
    setTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = html.getAttribute("data-color-scheme");
            const nextTheme = currentTheme === "dark" ? "light" : "dark";
            setTheme(nextTheme);
        });
    }
};

const initializeTranslationToggle = () => {
    const html = document.documentElement;
    const translateToggle = document.getElementById("translateToggle");

    const setLanguage = (lang) => {
        localStorage.setItem("lang", lang);
        html.setAttribute("data-lang", lang);
    };

    const savedLang = localStorage.getItem("lang") || "tr";
    setLanguage(savedLang);

    if (translateToggle) {
        translateToggle.addEventListener("click", () => {
            const current = html.getAttribute("data-lang") || "tr";
            const next = current === "tr" ? "en" : "tr";
            setLanguage(next);

            window.location.reload();
        });
    }

    document.querySelectorAll("[data-key]").forEach((el) => {
        const key = el.getAttribute("data-key");
        const parentSpan = el.querySelector(".brand-text");

        if (parentSpan) {
            parentSpan.textContent = translations[savedLang][key];
        } else {
            el.innerHTML = translations[savedLang][key];
        }
    });
};

document.addEventListener("DOMContentLoaded", async () => {
    await Promise.all([
        loadComponent("#header-placeholder", "components/header.html"),
        loadComponent("#footer-placeholder", "components/footer.html"),
    ]);

    initializeThemeToggle();
    initializeTranslationToggle();
});
