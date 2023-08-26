const form = document.querySelector('#contact-form');

const endpoint = 'https://formsubmit.co/5f0f9995143bfb7bcf4d49ef2a9749b1';

async function postMessage(body, url = endpoint) {
	try {
		const response = await fetch(url, {
			method: 'POST',
			body: new FormData(body),
		});
		const parsedResponse = await response.json();
		console.log(parsedResponse);
		alert('Gracias, te responderemos en breve');
	} catch (error) {
		console.log(error);
	}
}

function handleSubmit(evt) {
	evt.preventDefault();
	postMessage(form);
}

form.addEventListener('submit', (evt) => handleSubmit(evt));
