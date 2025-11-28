$(document).ready(function () {
	const currentPath = window.location.pathname;
	const isInSubdir = currentPath.includes('/pages/');
	const prefix = isInSubdir ? '../' : '';

	const components = [
		{
			container: '#navbar-container',
			url: prefix + 'components/navbar.html'
		},
		{
			container: '#footer-container',
			url: prefix + 'components/footer.html'
		}
	];

	components.forEach(function (component) {
		$(component.container).load(component.url, function (response, status, xhr) {
			if (status === "error") {
				alert('Failed to load component');
			} else {
				if (component.container === '#navbar-container') {
					initNavbar();
				}
			}
		});
	});
});

function initNavbar() {
	const toggle = $('.navbar-toggle');
	const menu = $('.navbar-menu');

	toggle.on('click', function () {
		$(this).toggleClass('active');
		menu.toggleClass('active');
	});

	$(document).on('click', function (event) {
		if (!$(event.target).closest('.navbar-container').length) {
			toggle.removeClass('active');
			menu.removeClass('active');
		}
	});

	setActiveNavLink();
}

function setActiveNavLink() {
	const currentPath = window.location.pathname;
	const fileName = currentPath.substring(currentPath.lastIndexOf('/') + 1);

	$('.navbar-menu a').removeClass('active');

	$('.navbar-menu a').each(function () {
		const link = $(this);
		const href = link.attr('href');
		const hrefFileName = href.substring(href.lastIndexOf('/') + 1);

		if (
			(fileName === '' && hrefFileName === 'index.html') ||
			(fileName === 'index.html' && hrefFileName === 'index.html') ||
			(fileName !== '' && fileName !== 'index.html' && fileName === hrefFileName)
		) {
			link.addClass('active');
		}
	});
}