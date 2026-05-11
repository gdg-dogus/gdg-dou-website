# GDG on Campus DOU Website

This project is the official static website for **GDG on Campus DOU**, the Google Developer Groups student community at Doğuş University. It presents the community, upcoming and past events, team structure, blog content, student offers, and social links in a lightweight vanilla HTML/CSS/JavaScript setup.

## Purpose

The website exists to give students and visitors one clear place to:

- learn what GDG on Campus DOU is and what the community does;
- discover events, workshops, summits, technical trips, and info sessions;
- meet the organizer, assistant organizer, and team captains;
- read local and Medium-based blog content;
- find student-focused software, cloud, design, and learning offers;
- reach the community through Instagram, X, Medium, LinkedIn, and WhatsApp.

## How It Works

This is not a framework-based app. There is no build step, package manager, or backend server in the repository. Each page is a normal `.html` file styled with shared CSS and enhanced with ES module JavaScript. The reason for this choice is to lower the barrier of entry and allow newcomers to be able to contribute right away without the need for advanced library or framework knowledge.

The main pattern is:

1. HTML files provide the page shell and placeholders.
2. `js/main.js` loads the shared header, injects the footer, initializes the light/dark theme toggle, and applies Turkish/English translations.
3. Each feature page imports its own renderer from `js/renderers/`.
4. Renderers read structured data from `js/data/` and generate cards, filters, modals, counters, and lists in the browser.
5. `js/translations.js` provides bilingual UI text and localized content helpers.

Because the site uses JavaScript modules and `fetch()` for shared components, run it through a local web server instead of opening `index.html` directly from the filesystem.

## Pages

| Page | File | What it shows |
| --- | --- | --- |
| Home | `index.html` | Hero section, stats, upcoming events, focus tracks, blog preview, newsletter form, and social links |
| About | `about.html` | Community mission, focus areas, statistics, and call-to-action links |
| Events | `events.html` | Event cards, category/time filters, registration status, and event detail modals |
| Teams | `teams.html` | Organizer, assistant organizer, captains, team groups, social links, and team detail modals |
| Blog | `blog.html` | Local blog posts plus Medium posts fetched through RSS |
| Offers | `offers.html` | Student tools, discounts, and learning/resource offers |

## Project Structure

```text
.
|-- index.html
|-- about.html
|-- events.html
|-- teams.html
|-- blog.html
|-- offers.html
|-- components/
|   |-- header.html
|   `-- footer.html
|-- css/
|   |-- base.css
|   |-- layout.css
|   |-- components.css
|   `-- pages/
|-- js/
|   |-- main.js
|   |-- translations.js
|   |-- data/
|   |-- renderers/
|   `-- utils/
|-- assets/
|   |-- events/
|   `-- logo and technology images
|-- images/
|-- LICENSE
`-- README.md
```

### Important Folders

- `components/` contains reusable HTML fragments. The header is fetched by `js/main.js`; the footer markup is also represented in this project and currently injected by `js/main.js`.
- `css/` contains global variables, layout rules, reusable components, and page-specific styles.
- `js/data/` stores editable content for events, teams, blog posts, offers, and Medium configuration.
- `js/renderers/` turns the data files into interactive page content.
- `js/utils/` contains shared browser utilities such as visibility observers and Medium RSS fetching.
- `assets/` contains logos, technology images, SVGs, and event images.

## Content Files

Most website updates should be made in the data files instead of editing renderer logic:

- Events: `js/data/eventsData.js`
- Teams and members: `js/data/teamData.js`
- Blog posts: `js/data/blogData.js`
- Medium feed settings: `js/data/mediumConfig.js`
- Student offers: `js/data/offersData.js`
- Static bilingual text: `js/translations.js`

The data files include comments and templates explaining how to add new content. Turkish text is kept in the main fields, and English content usually lives under each item's `i18n.en` object.

## Run Locally

From the project folder, start a simple local server:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

No dependency installation is required.

## Original Builders

This website was originally built by the current **GDG on Campus DOU Web Development Team 2025-2026**:

- Dora Dikmen - Web Development Team Lead
- Berat Aydın - Web Development Co-Team Captain
- Fatiha Sarmusakcı - Web Development Team Member
- Ömer Can Ünlü - Web Development Team Member
- Dilan Özmen - Web Development Team Member
- Murat Ateş - Web Development Team Member

## License

This project is licensed under the MIT License. See `LICENSE` for details.
