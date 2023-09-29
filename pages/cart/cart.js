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

document.addEventListener('DOMContentLoaded', function () {});

// Variables para el carrito de compras
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout-button');
const cart = [];

// Función para actualizar el contenido del carrito
function updateCart() {
	const fragment = document.createDocumentFragment();
	const total = cart.reduce((acc, product) => {
		const cartItem = document.createElement('li');
		cartItem.innerText = `${product.name} - $${product.price.toFixed(2)}`;
		fragment.appendChild(cartItem);
		return acc + product.price;
	}, 0);

	cartItems.innerHTML = '';
	cartItems.appendChild(fragment);
	cartTotal.innerText = total.toFixed(2);
}

// Función para agregar un producto al carrito
function addToCart(product) {
	console.log('Añadiendo al carrito:', product);
	cart.push(product);
	updateCart();
}

// Función para manejar el evento de clic en el botón "Comprar"
function handleBuyButtonClick(event) {
	const productData = JSON.parse(event.target.dataset.product);
	addToCart(productData);
}

// Agrega un evento de clic a los botones "Comprar"
const buyButtons = document.querySelectorAll('.buy-button');
buyButtons.forEach(button => {
    button.addEventListener('click', handleBuyButtonClick);
});
