const SecurityUtils = {
	sanitizeHTML: function (str) {
		if (!str) return '';
		const temp = document.createElement('div');
		temp.textContent = str;
		return temp.innerHTML;
	},

	escapeHTML: function (str) {
		if (!str) return '';
		const map = {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#x27;',
			'/': '&#x2F;'
		};
		return String(str).replace(/[&<>"'/]/g, function (char) {
			return map[char];
		});
	},

	sanitizeURL: function (url) {
		if (!url) return '#';
		if (url.startsWith('/') || url.startsWith('./') || url.startsWith('../') || !url.includes(':')) {
			return url;
		}
		const allowedProtocols = ['http:', 'https:'];
		try {
			const urlObj = new URL(url);
			if (allowedProtocols.includes(urlObj.protocol)) {
				return url;
			}
		} catch (e) {
			return '#';
		}
		return '#';
	},

	isValidEmail: function (email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	},

	sanitizeSearchQuery: function (query) {
		if (!query) return '';
		return query.replace(/[<>\"'`]/g, '').trim();
	},

	RateLimiter: function (maxAttempts, timeWindow) {
		this.maxAttempts = maxAttempts || 5;
		this.timeWindow = timeWindow || 60000;
		this.attempts = [];

		this.attempt = function () {
			const now = Date.now();
			const newAttempts = [];

			for (let i = 0; i < this.attempts.length; i++) {
				if (now - this.attempts[i] < this.timeWindow) {
					newAttempts.push(this.attempts[i]);
				}
			}
			this.attempts = newAttempts;

			if (this.attempts.length >= this.maxAttempts) {
				return false;
			}

			this.attempts.push(now);
			return true;
		};
	}
};

window.SecurityUtils = SecurityUtils;
