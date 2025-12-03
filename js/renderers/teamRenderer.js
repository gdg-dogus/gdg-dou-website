import { teams, teamMembers } from "../data/teamData.js";
import { observeVisibility, initOrbVisibilityControl, initPageVisibilityControl } from "../utils/observer.js";

const SOCIAL_ICONS = {
    linkedin: `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
            <rect x="2" y="9" width="4" height="12" rx="1" fill="none" stroke="currentColor" stroke-width="1.6" />
            <circle cx="4" cy="4" r="2" fill="none" stroke="currentColor" stroke-width="1.6" />
        </svg>
    `,
    instagram: `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <rect x="3" y="3" width="18" height="18" rx="5" ry="5" fill="none" stroke="currentColor" stroke-width="1.6" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" fill="none" stroke="currentColor" stroke-width="1.6" />
            <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" />
        </svg>
    `,
    github: `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 0 0-.94 2.59V22" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    `,
    default: `
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M10 14a5 5 0 0 1-7 0 5 5 0 0 1 0-7 5 5 0 0 1 7 0m4 4a5 5 0 0 0 7 0 5 5 0 0 0 0-7 5 5 0 0 0-7 0M8 12l8-8" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    `,
};

const getTeamByKey = (teamKey) => {
    const entry = Object.entries(teams).find(([, team]) => team.key === teamKey);
    if (!entry) return { label: "", team: null };
    const [label, team] = entry;
    return { label, team };
};

const getMembersForTeam = (teamKey) => teamMembers.filter((member) => member.teamKey === teamKey);

const renderSocialLinks = (member) => {
    const socialEntries = Object.entries(member.social || {});
    if (!socialEntries.length) return "";

    const links = socialEntries
        .map(([network, url]) => {
            const icon = SOCIAL_ICONS[network] || SOCIAL_ICONS.default;
            const isDisabled = !url || url === "#";
            const safeUrl = isDisabled ? "#" : url;
            const attributes = isDisabled ? 'aria-disabled="true"' : 'target="_blank" rel="noopener"';

            return `
                <a
                    class="team-social-icon"
                    data-network="${network}"
                    href="${safeUrl}"
                    ${attributes}
                    aria-label="${member.name} ${network} profili"
                >
                    ${icon}
                </a>
            `;
        })
        .join("");

    if (!links) return "";
    return `<div class="team-socials" aria-label="${member.name} sosyal bağlantıları">${links}</div>`;
};

const openTeamModal = (teamKey) => {
    const modal = document.getElementById("teamModal");
    const modalContent = document.getElementById("teamModalContent");
    if (!modal || !modalContent) return;

    const { label: teamLabel, team } = getTeamByKey(teamKey);
    if (!team) return;

    const coreMembers = getMembersForTeam(teamKey);
    const extraNames = (team.members || []).filter(
        (name) => !coreMembers.some((member) => member.name === name)
    );

    modalContent.innerHTML = `
        <div class="team-modal-shell">
            <header class="team-modal-header">
                <div class="team-modal-title-row">
                    <h2 class="team-modal-title">${teamLabel}</h2>
                    <span class="offer-category-badge">${team.captain || "Team Lead"}</span>
                </div>
                <p class="team-modal-subtitle">Takım Üyeleri ve Sorumlulukları</p>
            </header>

            <section class="team-modal-about">
                <h3 class="team-modal-about-title">
                    <span class="material-symbols-outlined">info</span>
                    Takım Hakkında
                </h3>
                <p class="team-modal-about-text">
                    ${team.description}
                </p>
            </section>

            <section class="team-modal-members">
                ${coreMembers
                    .map((member) => {
                        const initials = member.name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 3);

                        return `
                        <article class="team-modal-member-card">
                            <div class="team-modal-member-avatar">
                                <div class="team-modal-avatar-circle">
                                    <div class="team-modal-avatar-inner">
                                        ${initials}
                                    </div>
                                </div>
                            </div>
                            <h4 class="team-modal-member-name">${member.name}</h4>
                            <p class="team-modal-member-role">${member.role}</p>
                        </article>
                    `;
                    })
                    .join("")}

                ${extraNames
                    .map((name) => {
                        const initials = name
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .toUpperCase()
                            .slice(0, 3);

                        return `
                        <article class="team-modal-member-card">
                            <div class="team-modal-member-avatar">
                                <div class="team-modal-avatar-circle">
                                    <div class="team-modal-avatar-inner">
                                        ${initials}
                                    </div>
                                </div>
                            </div>
                            <h4 class="team-modal-member-name">${name}</h4>
                            <p class="team-modal-member-role">Team Member</p>
                        </article>
                    `;
                    })
                    .join("")}
            </section>
        </div>
    `;

    modal.setAttribute("aria-hidden", "false");
    modal.classList.add("active");
};

const closeTeamModal = () => {
    const modal = document.getElementById("teamModal");
    if (!modal) return;
    modal.setAttribute("aria-hidden", "true");
    modal.classList.remove("active");
};

const renderCoreTeam = (members) => {
    const teamGrid = document.querySelector(".team-grid");
    if (!teamGrid) return;

    teamGrid.innerHTML = "";

    const displayMembers = members.filter(
        (member) => /lead/i.test(member.role) || /organizer/i.test(member.role)
    );

    displayMembers.forEach((member, index) => {
        const teamCard = document.createElement("article");
        teamCard.className = "team-card";

        teamCard.setAttribute("data-role", member.role);
        teamCard.dataset.delay = index;

        const socialLinks = renderSocialLinks(member);

        teamCard.innerHTML = `
            <img src="${member.image}" alt="${member.name}" class="team-logo" loading="lazy" decoding="async">
            <div class="team-content">
                <h3 class="team-title">${member.name}</h3>
                <p class="team-role-tag">${member.role}</p>
                <p class="team-desc">${member.bio}</p>
                ${socialLinks}
            </div>
        `;

        const open = () => {
            openTeamModal(member.teamKey);
        };

        teamCard.addEventListener("click", open);

        teamCard.querySelectorAll(".team-social-icon").forEach((icon) => {
            icon.addEventListener("click", (event) => {
                event.stopPropagation();

                if (icon.getAttribute("aria-disabled") === "true") {
                    event.preventDefault();
                }
            });
        });

        teamGrid.appendChild(teamCard);

        observeVisibility(teamCard);
    });
};

const initTeamPage = () => {
    const modal = document.getElementById("teamModal");
    const closeModalButton = document.getElementById("closeTeamModal");

    if (closeModalButton) {
        closeModalButton.addEventListener("click", closeTeamModal);
    }

    if (modal) {
        modal.addEventListener("click", (event) => {
            if (event.target === modal) {
                closeTeamModal();
            }
        });
    }

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeTeamModal();
        }
    });

    renderCoreTeam(teamMembers);
    
    // Initialize orb visibility control for performance
    initOrbVisibilityControl();
    initPageVisibilityControl();
};

document.addEventListener("DOMContentLoaded", initTeamPage);
