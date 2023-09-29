import cart from '../assets/img/cart.png';
import user from '../assets/img/user.png';

import logo from '../assets/img/logo.png';

export function navbar() {
	return `
	<nav class="navbar navbar-expand-lg bg-body-tertiary">
	<div class="container-fluid">
		<a class="navbar-brand" href="/index.html">
			<img src="${logo}" alt="Logo" width="50" height="50" class="rounded-circle align-text-" />
			Beer Craft Collective</a
		>
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarSupportedContent"
			aria-controls="navbarSupportedContent"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse justify-content-between" id="navbarSupportedContent">
			<div class="navbar-nav mb-1 mx-1">
				<a href="/index.html" aria-current="page" class="nav-item nav-link mx-5">Inicio</a>
				<a href="/pages/about/about.html" class="nav-item nav-link mx-5">Nosotros</a>
				<a href="/pages/contact/contact.html" class="nav-item nav-link mx-5">Contacto</a>
			</div>
			<div class="navbar-nav mb-1 mx-5">
				<a href="/pages/cart/cart.html" class="nav-item nav-link ">
					<img
						src="${cart}"
						alt="cart"
						width="30"
						height="30"
						class="align-text-center quantity"
					/>Carrito</a
				>

				<a href="/pages/user-login/userLogin.html" class="nav-item nav-link">
					<img src="${user}" alt="" width="30" height="30" class="align-text-center" />
					Login</a
				>
			</div>
		</div>
	</div>
</nav>


	`;
}
