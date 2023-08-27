/* eslint-disable no-empty */
const form = document.forms['contact-form'];
const submitBtn = form.elements['submit-btn'];
const nameInput = form.elements['name'];
const emailInput = form.elements['email'];
const textArea = form.elements['message'];
const formInputs = [nameInput, emailInput, textArea];
let hasClickedSubmit = false;

const endpoint = 'https://formsubmit.co/ajax/5f0f9995143bfb7bcf4d49ef2a9749b1';

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
	const validNameChars = new RegExp(/[A-Zñáéíóúüçäëïöàèìòù\s]/i);
	if (!validNameChars.test(evt.data)) evt.preventDefault();
}

function validateEmailChar(evt) {
	// console.log(evt.target.checkValidity());
	// const invalidEmailChars = new RegExp(/[A-Zñáéíóúüçäëïöàèìòù\s]/i);
	// if (invalidEmailChars.test(evt.data)) evt.preventDefault();
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

	// if (target.type === 'email') return validateEmailOnInput(target);

	if (hasClickedSubmit && target.value !== '') {
		setValidInput(target);
	} else if (hasClickedSubmit && target.value === '') {
		setInvalidInput(target);
	} else if (target.value === '') {
		setDefaultInput(target);
	}
}

function validateEmailOnInput(emailInput) {
	if (hasClickedSubmit && emailInput.value) {
		if (emailInput.checkValidity()) {
			setValidInput(emailInput);
			return true;
		} else {
			setInvalidInput(emailInput);
			return false;
		}
	} else if (hasClickedSubmit && !emailInput.value) {
		setInvalidInput(emailInput);
		return false;
	} else if (emailInput.value === '') {
		setDefaultInput(emailInput);
	}
}


function onBlur(evt) {

	if (evt.target.value !== '') {
		if (evt.target.type === 'email') {
			validateEmailOnSubmit(emailInput);
		} else {
			setValidInput(evt.target);
		}
	}

	

	// if (evt.target.type === 'email') {
	// 	validateEmailOnBlur(emailInput);
	// } else if(evt.target.value !== '') {
	// 	setValidInput(evt.target);
	// }

	// if (evt.target.value !== '') {

	// 	if (evt.target.type === 'email') {
	// 		if (!evt.target.checkValidity()) {
	// 			setInvalidInput(evt.target);
	// 		} else {
	// 			setValidInput(evt.target);
	// 		}
	// 	} 
	
	// 	else {
	// 		setValidInput(evt.target);
	// 	}
	// }
}


function validateEmailOnSubmit(emailInput) {
	if (emailInput.value) {
		if (emailInput.checkValidity()) {
			console.log('valid email')
			setValidInput(emailInput);
			return true;
		} else {
			setInvalidInput(emailInput);
			return false;
		}
	} else {
		setInvalidInput(emailInput);
		return false;
	}
}

function validateInput(input) {

	if (input.type === 'email') return validateEmailOnSubmit(input);

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

let isShaking = false;
function shakeSubmitBtn() {
	if (!isShaking) {
		isShaking = true;
		submitBtn.classList.add('shake');
		setTimeout(() => {
			submitBtn.classList.remove('shake');
			isShaking = false;
		}, 1100);
	}
}

function handleSubmit(evt) {
	evt.preventDefault();
	hasClickedSubmit = true;
	if (isFormValid()) {
		// postMessage(form);
		hasClickedSubmit = false;
		console.log('Valid');
		formInputs.forEach((input) => setDefaultInput(input));
	} else {
		shakeSubmitBtn();
		console.log('Not valid');
	}
}

form.addEventListener('submit', (evt) => handleSubmit(evt));
nameInput.addEventListener('beforeinput', (evt) => validateNameChar(evt));
// emailInput.addEventListener('beforeinput', (evt) => validateEmailChar(evt));
formInputs.forEach((input) => {
	input.addEventListener('input', (evt) => onInput(evt));
	input.addEventListener('blur', (evt) => onBlur(evt));
});

// Email input validation, disallow spaces, require arroba @ ?
