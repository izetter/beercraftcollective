import { footer } from '../../components/footer.js';
import { navbar } from '../../components/navbar.js';

const $formUser = document.getElementById('form-user');

$formUser.addEventListener('submit', loginUser);

function loginUser(e) {
	e.preventDefault();
	const $email = document.getElementById('email').value;
	const $password = document.getElementById('password').value;

	if (!$email || !$password) {
		alert('Por favor, completa todos los campos.');
		return;
	}

	//obtenemos lo que almacenamos en el localStorage al registrar el user
	const users = JSON.parse(localStorage.getItem('users')) || [];

	const userFind = users.find((user) => user.email === $email && user.password === $password);
	console.table(userFind);

	if (userFind) {
		alert('Inicio de sesión exitoso.');
	} else {
		alert('Usuario o contraseña incorrectos.');
	}

	$formUser.reset();
}

const footerElement = document.querySelector('footer');

footerElement.innerHTML = footer();

const navTemplate = document.createElement('template');
navTemplate.innerHTML = navbar();
document.querySelector('nav').replaceWith(navTemplate.content);

const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = footer();
document.querySelector('footer').replaceWith(footerTemplate.content);
