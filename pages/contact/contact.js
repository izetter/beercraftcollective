const form = document.querySelector('main form');

const endpoint = 'https://reqres.in/api/register';

async function postMessage(body, url = endpoint) {
	try {
		const response = await fetch(url, {
			method: 'POST',
			body: body,
			headers: { 'Content-Type': 'application/json' },
		});
		const parsedResponse = await response.json();
		console.log(parsedResponse);
	} catch (error) {
		console.log(error);
	}
}

function handleSubmit(evt) {
	evt.preventDefault();

	const message = {
		email: 'eve.holt@reqres.in',
		password: form.elements.name,
	};

	console.dir(form.elements.name);
	postMessage(JSON.stringify(message));
}

form.addEventListener('submit', (evt) => handleSubmit(evt));
