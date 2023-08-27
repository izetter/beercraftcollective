const form = document.forms['contact-form'];
const nameInput = form.elements['name'];
const emailInput = form.elements['email'];
const textArea = form.elements['message'];
const formInputs = [nameInput, emailInput, textArea];
const validNameChars = new RegExp(/[A-Zñáéíóúüçäëïöàèìòù\s]/i);
let hasClickedSubmit = false;

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

function validateNameChar(evt) {
	if (!validNameChars.test(evt.data)) evt.preventDefault();
}

function setValidInput(input) {
	input.classList.remove('border-dark-subtle', 'is-invalid');
	input.classList.add('is-valid');
}

function setInvalidInput(input) {
	input.classList.remove('border-dark-subtle', 'is-valid');
	input.classList.add('is-invalid');
}

function setDefaultInput(input) {
	input.classList.remove('is-valid', 'is-invalid');
	input.classList.add('border-dark-subtle');
}

function onInput(evt) {
	const { target } = evt;
	if (hasClickedSubmit && target.value !== '') {
		setValidInput(target);
	} else if (hasClickedSubmit && target.value === '') {
		setInvalidInput(target);
	} else if (target.value === '') {
		setDefaultInput(target);
	}
}

function onBlur(evt) {
	if (evt.target.value !== '') {
		setValidInput(evt.target);
	}
}

function validateInput(input) {
	if (input.value) {
		setValidInput(input);
		return true;
	} else {
		setInvalidInput(input);
		return false;
	}
}

function isFormValid() {
	return formInputs.map((input) => validateInput(input)).every((validity) => validity === true);
}

function handleSubmit(evt) {
	evt.preventDefault();
	hasClickedSubmit = true;
	if (isFormValid()) {
		// postMessage(form);
		hasClickedSubmit = false;
		console.log('Valid');
		formInputs.forEach((input) => setDefaultInput(input));
	}
	console.log('Not valid');
}

form.addEventListener('submit', (evt) => handleSubmit(evt));
nameInput.addEventListener('beforeinput', (evt) => validateNameChar(evt));
formInputs.forEach((input) => {
	input.addEventListener('input', (evt) => onInput(evt));
	input.addEventListener('blur', (evt) => onBlur(evt));
})

// nameInput.addEventListener('input', (evt) => onInput(evt));
// nameInput.addEventListener('blur', (evt) => onBlur(evt));
// emailInput.addEventListener('blur', (evt) => validateNameInput(evt.target));
// textArea.addEventListener('blur', (evt) => validateNameInput(evt.target));
