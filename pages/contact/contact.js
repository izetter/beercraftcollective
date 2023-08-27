const form = document.forms['contact-form'];
const nameInput = form.elements['name'];
const emailInput = form.elements['email'];
const textArea = form.elements['message'];
const formInputs = [nameInput, emailInput, textArea];
const validChars = new RegExp(/[A-Zñáéíóúüçäëïöàèìòù\s]/i);
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

function validateInput(input) {
	if (input.value) {
		input.classList.remove('border-dark-subtle');
		input.classList.add('is-valid');
		return true;
	} else {
		input.classList.remove('border-dark-subtle');
		input.classList.add('is-invalid');
		return false;
	}
}

function isFormValid() {
	// return formInputs.some((input) => validateInput(input));
	return false;
}

function handleNameInput() {
	if (hasClickedSubmit) {
	} else {
	}
}

function validateChar(evt) {
	if (!validChars.test(evt.data)) evt.preventDefault();
}

function setValidInput(input) {
	input.classList.remove('border-dark-subtle', 'is-invalid');
	input.classList.add('is-valid');
	input.dataset.validated = true;
}

function setInvalidInput(input) {
	input.classList.remove('border-dark-subtle', 'is-valid');
	input.classList.add('is-invalid');
	input.dataset.validated = true;
}

function setDefaultInput(input) {
	input.classList.remove('is-valid', 'is-invalid');
	input.classList.add('border-dark-subtle');
	input.dataset.validated = false;
}

function onInput(evt) {
	const { target } = evt;
	if (hasClickedSubmit && target.value !== '') {
		setValidInput(target);
	} else if (hasClickedSubmit && target.value === '') {
		setInvalidInput(target);
	} else if (target.value === '') {
		setInvalidInput(target);
		// setDefaultInput(target);
	}
}

function onBlur(evt) {
	if (evt.target.value !== '') {
		setValidInput(evt.target);
	}
}

function handleSubmit(evt) {
	evt.preventDefault();
	hasClickedSubmit = true;
	if (isFormValid()) {
		// postMessage(form);
		console.log('Valid');
		formInputs.forEach((input) => setDefaultInput(input));
	}
	console.log('Not valid');
}

function checkEmptyInputs() {}

form.addEventListener('submit', (evt) => handleSubmit(evt));
nameInput.addEventListener('beforeinput', (evt) => validateChar(evt));
nameInput.addEventListener('input', (evt) => onInput(evt));
nameInput.addEventListener('blur', (evt) => onBlur(evt));
// emailInput.addEventListener('blur', (evt) => validateNameInput(evt.target));
// textArea.addEventListener('blur', (evt) => validateNameInput(evt.target));
