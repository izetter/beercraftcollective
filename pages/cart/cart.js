import { footer } from '../../components/footer.js';
import { navbar } from '../../components/navbar.js';
import { CartManager } from '../../utils/CartManager.js';

const footerElement = document.querySelector('footer');

footerElement.innerHTML = footer();

const navTemplate = document.createElement('template');
navTemplate.innerHTML = navbar();
document.querySelector('nav').replaceWith(navTemplate.content);

const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = footer();
document.querySelector('footer').replaceWith(footerTemplate.content);

// Obtén los productos del carrito
const cartItems = JSON.parse(localStorage.getItem('carritoCompras'));

function displayCartProducts(cartItems) {
	// Obtén una referencia al elemento HTML donde deseas mostrar los productos del carrito
	const cartPage = document.querySelector('.cart-page');

	// Limpia el contenido actual de la página del carrito
	cartPage.innerHTML = '';

	// Verifica si el carrito está vacío
	if (cartItems.length === 0) {
		cartPage.innerHTML = '<p>El carrito está vacío.</p>';
	} else {
		let totalCart = 0; // Inicializamos el total del cart  en 0

		// Recorre los productos del carrito y crea un elemento div para cada uno
		cartItems.forEach((product) => {
			const productDiv = document.createElement('div');
			productDiv.className = 'd-sm-flex justify-content-around my-1 pb-1 border-bottom';

			// Calcula el subtotal para este producto
			const subtotal = product.price * product.quantity;

			totalCart += subtotal;

			const amount = document.querySelector('.amount-cart');
			amount.textContent = totalCart;

			productDiv.innerHTML = `
		  <div class="media d-block d-sm-flex text-center text-sm-left">
			<a class="cart-item-thumb mx-auto mr-sm-4" href="#">
			  <img src="${product.img}" alt="Product" />
			</a>
			<div class="media-body pt-3 d-flex flex-column justify-content-center">
			  <h3 class="product-card-title font-weight-semibold border-0 pb-0">
				<span class="text-warning">${product.name}</span>
			  </h3>
			  <div class="font-size-sm"><span class="text-secondary mr-2 fs-5">Estilo:</span>
			  <span class="fs-5">${product.style}</span></div>
			
			  <div class="font-size-lg text-primary pt-2">
			  <h4 class="text-secondary">Precio</h4>
			  <h3 class="text-secondary">${product.price}</h3></div>
			</div>

			<div class="media-body font-size-lg text-secondary pt-2 d-flex flex-column justify-content-center"
			<h4>Subtotal</h4>
			  <h3>${subtotal}</h3></div>
			</div>
		  </div>
		  <div class="pt-2 pt-sm-0 pl-sm-3 mx-auto mx-sm-0 text-center text-sm-left d-flex flex-column justify-content-center" style="max-width: 10rem">
			<div class="form-group mb-2">
			  <label for="quantity3">Cantidad</label>
			  <input class="form-control form-control-sm" type="number" id="quantity3" value="${product.quantity}" />
			</div>
			<button class="btn btn-outline-secondary btn-sm btn-block mb-2" type="button">
			  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-refresh-cw mr-1">
				<polyline points="23 4 23 10 17 10"></polyline>
				<polyline points="1 20 1 14 7 14"></polyline>
				<path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path>
			  </svg>
			  Update cart
			</button>
			<button class="btn btn-outline-danger btn-sm btn-block mb-2" type="button">
			  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2 mr-1">
				<polyline points="3 6 5 6 21 6"></polyline>
				<path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
				<line x1="10" y1="11" x2="10" y2="17"></line>
				<line x1="14" y1="11" x2="14" y2="17"></line>
			  </svg>
			  Remove
			</button>
		  </div>
		`;

			// Agrega el elemento div al contenedor de la página del carrito
			cartPage.appendChild(productDiv);
		});
	}
}

// Llamada a la función para mostrar los productos del carrito en la página del carrito
displayCartProducts(cartItems);
