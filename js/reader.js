let ttsUtterance = null;
let ttsVoices = [];
let isReading = false;
let isPaused = false;

$(document).ready(function () {
	if (!('speechSynthesis' in window)) {
		$('#tts-reader-btn').prop('disabled', true).css('opacity', '0.5');
		alert('Text-to-speech is not supported in your browser.');
		return;
	}

	loadVoices();
	window.speechSynthesis.onvoiceschanged = loadVoices;

	$('#tts-reader-btn').on('click', function () {
		if (isReading) {
			stopReading();
		} else {
			startReading();
		}
	});

	$('#tts-play-pause').on('click', function () {
		if (isPaused) {
			resumeReading();
		} else {
			pauseReading();
		}
	});

	$('#tts-stop').on('click', function () {
		stopReading();
	});

	$('#tts-speed-select').on('change', function () {
		if (isReading && !isPaused) {
			const newSpeed = parseFloat($(this).val());
			window.speechSynthesis.cancel();

			ttsUtterance.rate = newSpeed;
			window.speechSynthesis.speak(ttsUtterance);
		}
	});
});

function loadVoices() {
	ttsVoices = window.speechSynthesis.getVoices();
}

function getArticleText() {
	let text = '';

	if ($('.article-content').length > 0) {
		text = $('.article-content').text().trim();
	} else if ($('#article-content').length > 0) {
		text = $('#article-content').text().trim();
	} else if ($('.blog-content').length > 0) {
		text = $('.blog-content').text().trim();
	} else if ($('article').length > 0) {
		text = $('article').text().trim();
	} else if ($('main').length > 0) {
		text = $('main').text().trim();
	}

	if (!text) {
		return 'No readable content found on this page.';
	}
	return text;
}

function startReading() {
	const text = getArticleText();

	if (!text || text === 'No readable content found on this page.') {
		alert('No content found to read. Make sure your article content has class "article-content" or ID "article-content".');
		return;
	}

	ttsUtterance = new SpeechSynthesisUtterance(text);

	if (ttsVoices.length > 0) {
		for (let i = 0; i < ttsVoices.length; i++) {
			if (ttsVoices[i].lang.indexOf('en') === 0) {
				ttsUtterance.voice = ttsVoices[i];
				break;
			}
		}
	}

	ttsUtterance.rate = parseFloat($('#tts-speed-select').val());
	ttsUtterance.pitch = 1;
	ttsUtterance.volume = 1;

	ttsUtterance.onstart = function () {
		isReading = true;
		isPaused = false;
		$('#tts-reader-btn').addClass('reading');
		$('.tts-text').text('Reading...');
		$('#tts-controls').show();
		updatePlayPauseIcon(false);
	};

	ttsUtterance.onend = function () {
		stopReading();
	};

	ttsUtterance.onerror = function (event) {
		stopReading();
	};

	window.speechSynthesis.speak(ttsUtterance);
}

function pauseReading() {
	if (isReading && !isPaused) {
		window.speechSynthesis.pause();
		isPaused = true;
		updatePlayPauseIcon(true);
	}
}

function resumeReading() {
	if (isReading && isPaused) {
		window.speechSynthesis.resume();
		isPaused = false;
		updatePlayPauseIcon(false);
	}
}

function stopReading() {
	window.speechSynthesis.cancel();
	isReading = false;
	isPaused = false;
	$('#tts-reader-btn').removeClass('reading');
	$('.tts-text').text('Listen');
	$('#tts-controls').hide();
	updatePlayPauseIcon(false);
}

function updatePlayPauseIcon(showPlay) {
	if (showPlay) {
		$('#tts-play-pause .play-icon').show();
		$('#tts-play-pause .pause-icon').hide();
	} else {
		$('#tts-play-pause .play-icon').hide();
		$('#tts-play-pause .pause-icon').show();
	}
}
