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

const usuariosAutorizados = [{ correo: 'admin@beercraft.org', contraseña: 'contraseña123' }];

document.querySelector('form').addEventListener('submit', function (event) {
	event.preventDefault();

	const emailInput = document.getElementById('exampleInputEmail1');
	const passwordInput = document.getElementById('exampleInputPassword1');

	const email = emailInput.value;
	const password = passwordInput.value;

	const usuarioValido = usuariosAutorizados.find((user) => user.correo === email && user.contraseña === password);

	if (usuarioValido) {
		window.location.href = '../admin/admin.html';
	} else {
		alert('Credenciales inválidas. Inténtalo de nuevo.');
	}
});
