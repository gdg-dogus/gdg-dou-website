$(document).ready(function () {
	loadStatistics();
});

function loadStatistics() {
	const isInSubdir = window.location.pathname.includes('/pages/');
	const dataPath = isInSubdir ? '../data/stats.json' : 'data/stats.json';

	$.ajax({
		url: dataPath,
		dataType: 'json',
		success: function (data) {
			renderStatistics(data);
		},
		error: function (xhr, status, error) {
			showErrorMessage();
		}
	});
}

function renderStatistics(statistics) {
	const statsGrid = $('.stats-grid');
	statsGrid.empty();

	statistics.forEach(function (stat) {
		const card = createStatCard(stat);
		statsGrid.append(card);
	});

	observeStatCards();
}

function createStatCard(stat) {
	const safeLabel = SecurityUtils.sanitizeHTML(stat.label);
	const safeColor = SecurityUtils.sanitizeHTML(stat.color);
	const safeSuffix = SecurityUtils.sanitizeHTML(stat.suffix);

	return `
        <div class="stat-card">
            <div class="stat-number ${safeColor}" data-target="${stat.number}" data-suffix="${safeSuffix}">0${safeSuffix}</div>
            <div class="stat-label">${safeLabel}</div>
        </div>
    `;
}

function observeStatCards() {
	const observer = new IntersectionObserver(function (entries) {
		for (let i = 0; i < entries.length; i++) {
			if (entries[i].isIntersecting) {
				const statNumber = $(entries[i].target).find('.stat-number');
				if (!statNumber.hasClass('animated')) {
					animateCounter(statNumber);
					statNumber.addClass('animated');
				}
			}
		}
	}, { threshold: 0.5 });

	$('.stat-card').each(function () {
		observer.observe(this);
	});
}

function animateCounter(element) {
	const target = parseInt(element.attr('data-target'));
	const suffix = element.attr('data-suffix');
	const duration = 2000;
	const increment = target / (duration / 16);
	let current = 0;

	const timer = setInterval(function () {
		current += increment;
		if (current >= target) {
			current = target;
			clearInterval(timer);
		}
		element.text(Math.floor(current) + suffix);
	}, 16);
}

function showErrorMessage() {
	const statsGrid = $('.stats-grid');
	statsGrid.html(`
        <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
            <p style="color: #5f6368;">Unable to load content. Please refresh the page.</p>
        </div>
    `);
}
