$(document).ready(function () {
	loadCollaborations();
});

function loadCollaborations() {
	$.ajax({
		url: 'data/collabs.json',
		dataType: 'json',
		success: function (data) {
			renderCollaborations(data);
		},
		error: function (xhr, status, error) {
			showErrorMessage();
		}
	});
}

function renderCollaborations(collaborations) {
	const collabGrid = $('.collab-grid');
	collabGrid.empty();

	collaborations.forEach(function (collab) {
		const card = createCollabCard(collab);
		collabGrid.append(card);
	});
}

function createCollabCard(collab) {
	const safeUrl = SecurityUtils.sanitizeURL(collab.url);
	const safeName = SecurityUtils.sanitizeHTML(collab.name);
	const safeDesc = SecurityUtils.sanitizeHTML(collab.description);
	const safeLogo = SecurityUtils.sanitizeURL(collab.logo);

	return `
		<a href="${safeUrl}" target="_blank" rel="noopener noreferrer" class="collab-card-link">
			<div class="collab-card">
				<div class="collab-logo-container">
					<img src="${safeLogo}" alt="${safeName} Logo" class="collab-logo-img">
				</div>
				<h3>${safeName}</h3>
				<p>${safeDesc}</p>
			</div>
		</a>
	`;
}

function showErrorMessage() {
	const collabGrid = $('.collab-grid');
	collabGrid.html(`
		<div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
			<p style="color: #5f6368;">Unable to load content. Please refresh the page.</p>
		</div>
	`);
}
