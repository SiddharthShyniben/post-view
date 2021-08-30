const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

if (params.title) document.querySelector('#post-title').innerText = `${params.link ? `<a href='${sanitize(params.link)}'>` : ''}${params.title}${params.link ? '</a>' : ''}`;
if (params.twitter) document.querySelector('#author-twitter').innerText = `<a href='https://twitter.com/${params.twitter.substring(1)}'>${params.twitter}</a>`
if (params.description) document.querySelector('#description').innerText = params.description;
if (params.cover){
	let img = document.querySelector('#image');
	img.setAttribute('src', params.cover);
	img.setAttribute('alt', params.title || '')
} else {
	document.querySelector('.card-image').remove();
}

function sanitize(text) {
	return text.replace('"', '&quot').replace('\'', '&#39;')
}
