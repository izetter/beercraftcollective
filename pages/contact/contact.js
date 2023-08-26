const form = document.querySelector('main form');

const endpoint = 'https://formsubmit.co/ajax/zetter.contact@gmail.com'; // https://formsubmit.co/tania.gayosso@idr.edu.mx  // https://formsubmit.co/ajax/your@email.com

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
