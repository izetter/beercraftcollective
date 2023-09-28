import { footer } from '../../components/footer.js';
import { navbar } from '../../components/navbar.js';

document.addEventListener('DOMContentLoaded', function () {});

// Variables para el carrito de compras
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout-button');
let cart = [];

// Función para actualizar el contenido del carrito
function updateCart() {
	cartItems.innerHTML = '';
	let total = 0;

	cart.forEach((product) => {
		const cartItem = document.createElement('li');
		cartItem.innerText = `${product.name} - $${product.price.toFixed(2)}`;
		cartItems.appendChild(cartItem);
		total += product.price;
	});

	cartTotal.innerText = total.toFixed(2);
}
// En cart.js

// Función para agregar un producto al carrito
function addToCart(product) {
	console.log('Añadiendo al carrito:', product);
	cart.push(product);
	updateCart();
}
console.log(addToCart);

// Función para manejar el evento de clic en el botón "Comprar"
function handleBuyButtonClick(event) {
	if (event.target.classList.contains('buy-button')) {
		const productData = JSON.parse(event.target.dataset.product);
		addToCart(productData);
		// Puedes agregar lógica adicional aquí, si es necesario
	}
}

// Agrega un evento de clic a los botones "Comprar"
document.addEventListener('click', handleBuyButtonClick);
