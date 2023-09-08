import { footer } from '../../components/footer.js';
import { navbar } from '../../components/navbar.js';

const navTemplate = document.createElement('template');
navTemplate.innerHTML = navbar();
document.querySelector('nav').replaceWith(navTemplate.content);

const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = footer();
document.querySelector('footer').replaceWith(footerTemplate.content);

const users = [];

document.getElementById('registro-form').addEventListener('submit', function (event) {
	event.preventDefault(); // Prevenir la recarga de la página

	// Obtener los valores del formulario
	const name = document.getElementById('nombreCompleto').value;
	const phone = document.getElementById('telefono').value;
	const email = document.getElementById('email').value;
	const password = document.getElementById('password').value;
	const confirmPassword = document.getElementById('confirmPassword').value;

	// Validar que las contraseñas coincidan
	if (password !== confirmPassword) {
		alert('Las contraseñas no coinciden.');
		return;
	}

	// Validar el formato del correo electrónico
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		alert('El correo electrónico no es válido.');
		return;
	}

	// Validar el formato del número de teléfono
	const phoneRegex = /^\d{10}$/; // Suponiendo que el número tiene 10 dígitos
	if (!phoneRegex.test(phone)) {
		alert('El número de teléfono no es válido.');
		return;
	}

	// Crear un objeto JSON con los campos del usuario
	users.push({
		name,
		phone,
		email,
		password,
	});

	// Aquí puedes realizar otras acciones, como enviar los datos a un servidor

	// Mostrar un mensaje de éxito
	console.log(users);
	alert('Registro exitoso');
});
