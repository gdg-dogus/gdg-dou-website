<<<<<<< Updated upstream
=======
// Kartların görünürlüğünü role göre ayarlayan filtreleme fonksiyonu
function filterCards(filterValue) {
    const cards = document.querySelectorAll('.team-card');
    cards.forEach(card => {
        const cardRole = card.getAttribute('data-role'); 
        if (filterValue === 'all' || cardRole === filterValue) {
            card.style.display = ''; 
        } else {
            card.style.display = 'none'; 
        }
    });
}

// Filtre butonlarının oluşturulması ve tıklama olaylarının eklenmesi
function renderFilters(members) {
    const roleFiltersContainer = document.getElementById('roleFilters');
    if (!roleFiltersContainer) return;

   
    const uniqueRoles = [...new Set(members.map(member => member.role))];
    const roleButtonsHTML = uniqueRoles.map(role => `
        <button class="filter-btn" data-filter="${role}">${role}</button>
    `).join('');
    
    roleFiltersContainer.innerHTML = roleButtonsHTML;
    
    
    const allFilterButtons = document.querySelectorAll('.filter-btn');

    allFilterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');
            filterCards(filterValue);
            
            
            allFilterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
        });
    });
}

// Kartları HTML'e yerleştiren ana fonksiyon (Render Core Team)
function renderCoreTeam(members) {
    const teamGrid = document.querySelector('.team-grid');
    if (!teamGrid) return; 

    teamGrid.innerHTML = ''; 

    members.forEach((member, index) => { 
        const teamCard = document.createElement('article');
        teamCard.className = 'team-card';
        
        
        teamCard.style.opacity = '0'; 
        teamCard.style.animationDelay = `${index * 0.08}s`; 
        teamCard.setAttribute('data-role', member.role); 
        
        teamCard.innerHTML = `
            <div class="team-avatar">
                <img src="${member.image}" alt="${member.name}">
            </div>
            <div class="team-info">
                <h3 class="team-name">${member.name}</h3>
                <p class="team-role">${member.role}</p>
                <p class="team-bio">${member.bio}</p>
            </div>
            <div class="team-socials">
                <a href="${member.social.linkedin}" target="_blank" aria-label="LinkedIn">
                    <span class="material-symbols-outlined">linkedin</span> 
                </a>
                <a href="${member.social.instagram || '#'}" target="_blank" aria-label="Instagram">
                    <span class="material-symbols-outlined">person_pin</span> 
                </a>
            </div>
        `;
        
        teamGrid.appendChild(teamCard);
    });
}

//global tema 
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
 
    if (typeof teamMembers !== 'undefined') { //kartları çalıştırma
        renderCoreTeam(teamMembers);
        renderFilters(teamMembers); 
        filterCards('all');
    }
});
>>>>>>> Stashed changes
