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
	if (target.type === 'email') {
		validateEmailOnInput(target);
	} else if (hasClickedSubmit && target.value !== '') {
		setValidInput(target);
	} else if (hasClickedSubmit && target.value === '') {
		setInvalidInput(target);
	} else if (target.value === '') {
		setDefaultInput(target);
	}
}

let emailInputWasValidated = false;
function validateEmailOnInput(emailInput) {
	if (emailInput.value === '' && hasClickedSubmit) {
		setInvalidInput(emailInput);
	} else if (emailInput.value === '' && hasClickedSubmit === false) {
		setDefaultInput(emailInput);
		emailInputWasValidated === false;
	} else if (emailInput.checkValidity() && hasClickedSubmit) {
		setValidInput(emailInput);
	} else if (emailInput.checkValidity() === false && hasClickedSubmit) {
		setInvalidInput(emailInput);
	} else if(emailInput.checkValidity() && emailInputWasValidated) {
		setValidInput(emailInput);
	} else if(emailInput.checkValidity() === false && emailInputWasValidated) {
		setInvalidInput(emailInput);

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
}

function validateEmailOnSubmit(emailInput) {
	emailInputWasValidated = true;
	if (emailInput.value) {
		if (emailInput.checkValidity()) {
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
		postMessage(form);
		hasClickedSubmit = false;
		emailInputWasValidated = false;
		formInputs.forEach((input) => setDefaultInput(input));
		console.log('Valid');
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

// onclick on button invalid for shake btn regardless of user agent hint on email
