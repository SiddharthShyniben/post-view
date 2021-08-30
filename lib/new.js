'use strict';

var mainForm = document.querySelector('#main-form');

var linkInput = document.querySelector('#form-link');
var titleInput = document.querySelector('#form-title');
var twitterInput = document.querySelector('#form-twitter');
var descriptionInput = document.querySelector('#form-description');

// Not putting it in a form because, why should we be allowed to edit the cover image?
var coverImage = '';

function createLink() {
	return 'https://siddharthshyniben.github.io/post-view/view?link=' + encodeURIComponent(linkInput.value) + '&title=' + encodeURIComponent(titleInput.value) + '&description=' + encodeURIComponent(descriptionInput.value) + '&twitter=' + encodeURIComponent(twitterInput.value) + '&cover=' + encodeURIComponent(coverImage);
}

function onNeedToAutofill() {
	fetch(this.value).then(function (text) {
		return text.text();
	}).then(function (text) {
		var dummyEl = document.createElement('html');
		dummyEl.innerHTML = text;

		var data = {};

		var metaTags = dummyEl.querySelectorAll('meta');
		metaTags.forEach(function (tag) {
			var prop = tag.getAttribute('property');
			var name = tag.getAttribute('name');
			var val = tag.getAttribute('content');

			if (prop === 'og:title') data.title = val;else if (name === 'twitter:title') data.title = val;

			if (prop === 'og:description') data.description = val;else if (name === 'twitter:description') data.description = val;

			if (name === 'twitter:creator') data.twitter = val;

			if (prop === 'og:image') data.img = val;else if (name === 'twitter:image') data.img = val;
		});

		if (data.title) titleInput.value = data.title;
		if (data.description) descriptionInput.value = data.description;
		if (data.twitter) twitterInput.value = data.twitter;
		if (data.img) coverImage = data.img;
	}).catch(function (e) {
		return console.log(e);
	});
}

function onSubmit(event) {
	event.preventDefault();
	document.querySelector('#link-container').innerHTML = '\n\t\t<div class=\'notification is-primary\'>\n\t\t\tYour link is ready!<br>\n\t\t\t\t<strong><a href=\'' + createLink() + '\' target=\'postview\'>' + createLink() + '</a></strong>\n\t\t</div>\n\t\t<br>\n\t';
	window.scrollTo({ top: 0, left: 0, behaviour: 'smooth' });
}

mainForm.addEventListener('submit', onSubmit);
linkInput.addEventListener('input', onNeedToAutofill);