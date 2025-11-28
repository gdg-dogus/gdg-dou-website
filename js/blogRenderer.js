let allBlogs = [];
let filteredBlogs = [];
let currentFilter = 'All';
const searchLimiter = new SecurityUtils.RateLimiter(30, 10000);

$(document).ready(function () {
	loadBlogs();
	setupEventListeners();
});

function loadBlogs() {
	$.ajax({
		url: '../data/blogs.json',
		dataType: 'json',
		success: function (data) {
			allBlogs = data;
			filteredBlogs = data;
			renderBlogs(filteredBlogs);
		},
		error: function (xhr, status, error) {
			showErrorMessage();
		}
	});
}

function renderBlogs(blogs) {
	const blogGrid = $('.blog-grid');
	blogGrid.empty();

	if (blogs.length === 0) {
		blogGrid.html('<div class="no-results">No blog posts found matching your criteria.</div>');
		return;
	}

	blogs.forEach(function (blog) {
		const card = createBlogCard(blog);
		blogGrid.append(card);
	});
}

function createBlogCard(blog) {
	const safeTitle = SecurityUtils.sanitizeHTML(blog.title);
	const safeCategory = SecurityUtils.sanitizeHTML(blog.category);

	return `
		<div class="blog-card-container" data-category="${safeCategory}" data-title="${safeTitle.toLowerCase()}">
			<div class="blog-card">
				<div class="blog-card-content">
					<h3>${safeTitle}</h3>
					<p class="blog-category">${safeCategory}</p>
					<p class="blog-date">${formatDate(blog.date)}</p>
				</div>
			</div>
		</div>
	`;
}

function formatDate(dateString) {
	const date = new Date(dateString);
	return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function setupEventListeners() {
	$('.search-input').on('input', function () {
		performSearch();
	});

	$('.search-btn').on('click', function () {
		performSearch();
	});

	$('.search-input').on('keypress', function (e) {
		if (e.which === 13) {
			performSearch();
		}
	});

	$('.filter-btn').on('click', function () {
		const category = $(this).data('category');
		setActiveFilter($(this), category);
		filterBlogs(category);
	});
}

function performSearch() {
	if (!searchLimiter.attempt()) {
		$('.search-input').after('<div class="rate-limit-warning" style="color: #EA4335; font-size: 0.9rem; margin-top: 0.5rem;">Too many searches. Please wait a moment.</div>');
		setTimeout(function () {
			$('.rate-limit-warning').remove();
		}, 3000);
		return;
	}

	const rawInput = $('.search-input').val();
	const searchTerm = SecurityUtils.sanitizeSearchQuery(rawInput).toLowerCase().trim();

	if (searchTerm === '') {
		filteredBlogs = filterByCategory(allBlogs, currentFilter);
	} else {
		const categoryFiltered = filterByCategory(allBlogs, currentFilter);
		filteredBlogs = [];
		for (let i = 0; i < categoryFiltered.length; i++) {
			if (categoryFiltered[i].title.toLowerCase().indexOf(searchTerm) !== -1) {
				filteredBlogs.push(categoryFiltered[i]);
			}
		}
	}

	renderBlogs(filteredBlogs);
}

function filterBlogs(category) {
	currentFilter = category;
	const rawInput = $('.search-input').val();
	const searchTerm = SecurityUtils.sanitizeSearchQuery(rawInput).toLowerCase().trim();

	let filtered = filterByCategory(allBlogs, category);

	if (searchTerm !== '') {
		let searchFiltered = [];
		for (let i = 0; i < filtered.length; i++) {
			if (filtered[i].title.toLowerCase().indexOf(searchTerm) !== -1) {
				searchFiltered.push(filtered[i]);
			}
		}
		filtered = searchFiltered;
	}

	filteredBlogs = filtered;
	renderBlogs(filteredBlogs);
}

function filterByCategory(blogs, category) {
	if (category === 'All') {
		return blogs;
	}
	let result = [];
	for (let i = 0; i < blogs.length; i++) {
		if (blogs[i].category === category) {
			result.push(blogs[i]);
		}
	}
	return result;
}

function setActiveFilter(button, category) {
	$('.filter-btn').removeClass('active');
	button.addClass('active');
}

function showErrorMessage() {
	const blogGrid = $('.blog-grid');
	blogGrid.html(`
		<div class="no-results">Unable to load content. Please refresh the page.</div>
	`);
}
