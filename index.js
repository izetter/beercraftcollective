import { navbar } from './components/navbar.js';
import { footer } from './components/footer.js';
import { productCard } from './components/productCard.js';
import { fetchUtils } from './utils/fetchUtils.js';
import { CartManager } from './utils/CartManager.js';

const searchInput = document.querySelector('#search-items');
const notFound = document.querySelector('#beer-not-found');

const productSection = document.getElementById('product-section');
let products = JSON.parse(localStorage.getItem('products'));

const quantityProducts = document.querySelector('.quantity-products');
quantityProducts.innerText = '';

function showProducts(productList) {
	productSection.innerText = null;
	productList.forEach((product) => {
		const cardTemplate = document.createElement('template');
		cardTemplate.innerHTML = productCard(product);
		const cardContent = cardTemplate.content.firstElementChild; // Obtiene el primer elemento hijo (la tarjeta de producto)
		productSection.appendChild(cardContent); // Agrega la tarjeta de producto al productSection
		const but = cardContent.querySelector('.buy-button');

		// Agrega un manejador de clic al botón de compra dentro de la

		but.addEventListener('click', () => {
			// Realiza la acción que deseas al hacer clic en el botón de compra
			// Por ejemplo, puedes llamar a la función addProduct(product) aquí
			addProduct(product);
		});
	});
}

/// INSTANCIAR LA CLASE CART MANAGER PARA MANEJAR EL CARRITO DE COMPRAS
const cart = new CartManager();

function addProduct(product) {
	cart.addItem(product);
	console.log('Contenido actual del carrito:', cart.showItems());
	quantityProducts.innerText = cart.quantityProducts();
	cart.amount();
	console.log(cart.amount());
}

function normalizeStr(str) {
	return str
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase();
}

function handleInput() {
	const searchStr = normalizeStr(searchInput.value);
	const matchingProducts = products.filter((product) => {
		if (
			normalizeStr(product.name).includes(searchStr) ||
			normalizeStr(product.style).includes(searchStr) ||
			normalizeStr(product.origin).includes(searchStr)
		) {
			return true;
		}
	});
	matchingProducts.length === 0 ? (notFound.style.display = 'block') : (notFound.style.display = 'none');
	showProducts(matchingProducts);
}

// If there are products in local storage, render them. If there are not,
// fetch them from DB and set them in local storage and then render them from local storage.

(async () => {
	if (products) {
		showProducts(products);
	} else {
		const fetchedProducts = await fetchUtils.getAllProducts();
		localStorage.setItem('products', JSON.stringify(fetchedProducts));
		products = JSON.parse(localStorage.getItem('products'));
		showProducts(products);
	}
})();

searchInput.addEventListener('input', handleInput);

const navTemplate = document.createElement('template');
navTemplate.innerHTML = navbar();
document.querySelector('nav').replaceWith(navTemplate.content);

const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = footer();
document.querySelector('footer').replaceWith(footerTemplate.content);
