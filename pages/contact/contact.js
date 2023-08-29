import { footer } from "../../components/footer.js";
const footerElement = document.querySelector('footer');
const form = document.forms['contact-form'];
const submitBtn = form.elements['submit-btn'];
const nameInput = form.elements['name'];
const emailInput = form.elements['email'];
const textArea = form.elements['message'];
const formInputs = [nameInput, emailInput, textArea];
let emailInputWasValidated = false;
let hasClickedSubmit = false;
let isShaking = false;

function validateNameChar(evt) {
	const validNameChars = new RegExp(/[A-Zñáéíóúüçäëïöàèìòù\s]/i);
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

function onBlur(evt) {
	if (evt.target.value !== '') {
		if (evt.target.type === 'email') {
			validateEmail(emailInput);
		} else {
			setValidInput(evt.target);
		}
	}
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

function validateEmailOnInput(emailInput) {
	if (emailInput.value === '' && !hasClickedSubmit) {
		setDefaultInput(emailInput);
		emailInputWasValidated === false;
	} else if (emailInput.value === '' && hasClickedSubmit) {
		setInvalidInput(emailInput);
	} else if (emailInput.checkValidity() && hasClickedSubmit) {
		setValidInput(emailInput);
	} else if (!emailInput.checkValidity() && hasClickedSubmit) {
		setInvalidInput(emailInput);
	} else if(emailInput.checkValidity() && emailInputWasValidated) {
		setValidInput(emailInput);
	} else if(!emailInput.checkValidity() && emailInputWasValidated) {
		setInvalidInput(emailInput);
	}
}

function validateEmail(emailInput) {
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
	if (input.type === 'email') return validateEmail(input);
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
		hasClickedSubmit = false;
		emailInputWasValidated = false;
		formInputs.forEach((input) => setDefaultInput(input));
		console.log('Valid');
	} else {
		console.log('Not valid');
	}
}

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

function handleClick() {
	if (isFormValid()) {
		form.submit();
	} else {
		shakeSubmitBtn();
	}
}

form.addEventListener('submit', (evt) => handleSubmit(evt));
submitBtn.addEventListener('click', () => handleClick());
nameInput.addEventListener('beforeinput', (evt) => validateNameChar(evt));
emailInput.addEventListener('beforeinput', (evt) => {
	if (/\s/.test(evt.data)) evt.preventDefault();
});
formInputs.forEach((input) => {
	input.addEventListener('input', (evt) => onInput(evt));
	input.addEventListener('blur', (evt) => onBlur(evt));
});

footerElement.innerHTML = footer();
