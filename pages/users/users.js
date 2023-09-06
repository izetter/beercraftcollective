import { footer } from '../../components/footer.js';
import { navbar } from '../../components/navbar.js';

const footerElement = document.querySelector('footer');

footerElement.innerHTML = footer();

const navTemplate = document.createElement('template');
navTemplate.innerHTML = navbar();
document.querySelector('nav').replaceWith(navTemplate.content);

const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = footer();
document.querySelector('footer').replaceWith(footerTemplate.content);

document.getElementById('registrationForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validaciones
    if (fullName === '' || phoneNumber === '' || email === '' || password === '') {
        showAlert('Todos los campos son obligatorios.');
        return;
    }

    if (!isValidEmail(email)) {
        showAlert('Por favor, introduce un correo electrónico válido.');
        return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
        showAlert('Por favor, introduce un número de teléfono válido.');
        return;
    }

    if (password !== confirmPassword) {
        showAlert('Las contraseñas no coinciden.');
        return;
    }

    const userObject = {
        fullName,
        phoneNumber,
        email,
        password
    };

    console.log(userObject);
    showAlert('Registro exitoso.', 'success');
});

function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
}

function isValidPhoneNumber(phone) {
    const regex = /^\d{10}$/;  // Asume un número de teléfono de 10 dígitos.
    return regex.test(phone);
}

function showAlert(message, type = 'danger') {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} mt-3`;
    alert.textContent = message;
    document.querySelector('.container').appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 3000);
}
