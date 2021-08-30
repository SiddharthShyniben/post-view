'use strict';

var urlSearchParams = new URLSearchParams(window.location.search);
var params = Object.fromEntries(urlSearchParams.entries());

if (params.title) document.querySelector('#post-title').innerHTML = '' + (params.link ? '<a href=\'' + params.link + '\'>' : '') + params.title + (params.link ? '</a>' : '');
if (params.twitter) document.querySelector('#author-twitter').innerHTML = '<a href=\'https://twitter.com/' + params.twitter.substring(1) + '\'>' + params.twitter + '</a>';
if (params.description) document.querySelector('#description').innerHTML = params.description;
if (params.cover) {
	var img = document.querySelector('#image');
	img.setAttribute('src', params.cover);
	img.setAttribute('alt', params.title || '');
} else {
	document.querySelector('.card-image').remove();
}