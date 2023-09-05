export function navbar() {
	return `
		<nav class="navbar navbar-expand-lg bg-body-tertiary">
			<div class="container-fluid">
				<a class="navbar-brand" href="/index.html">
					<img src="/assets/img/logo.png" alt="Logo" width="50" height="50" class="rounded-circle align-text-">
					Beer Craft Collective</a>
				<button class="navbar-toggler" type="button" data-bs-toggle="collapse"
					data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
					aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse " id="navbarSupportedContent">
					<div class="navbar-nav mb-1 mx-3">
						<a href="/index.html" aria-current="page"
							class="nav-item nav-link mx-5">Inicio</a>
						<a href="/pages/about/about.html" class="nav-item nav-link mx-5">Nosotros</a>
						<a href="/pages/contact/contact.html" class="nav-item nav-link mx-5 active">Contacto</a>
						<a href="/pages/cart/cart.html" class="nav-item nav-link mx-5">Carrito</a>
						<a href="/pages/products/products.html" class="nav-item nav-link mx-5">Manage</a>
					</div>
				</div>
			</div>
		</nav>
	`;
}
