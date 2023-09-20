import { navbar } from './components/navbar.js';
import { footer } from './components/footer.js';
import { productCard } from './components/productCard.js';
import { sampleProductListTestAfterSubmitMOCK } from './assets/sampleProductListTestAfterSubmitMOCK.js';

const searchInput = document.querySelector('#search-items');

const productSection = document.getElementById('product-section');
const products = JSON.parse(localStorage.getItem('products'));

function showProducts(productList) {
	productSection.innerText = null;
	productList.forEach((product) => {
		const cardTemplate = document.createElement('template');
		cardTemplate.innerHTML = productCard(product);
		productSection.append(cardTemplate.content);
	});
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
	showProducts(matchingProducts);
}

// If there are products in local storage, render them. If there are not,
// set them in local storage with the sample and then render them from local storage.
if (products) {
	showProducts(products);
} else {
	localStorage.setItem('products', JSON.stringify(sampleProductListTestAfterSubmitMOCK));
	const sampleProducts = JSON.parse(localStorage.getItem('products'));
	showProducts(sampleProducts);
}

searchInput.addEventListener('input', handleInput);

const navTemplate = document.createElement('template');
navTemplate.innerHTML = navbar();
document.querySelector('nav').replaceWith(navTemplate.content);

const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = footer();
document.querySelector('footer').replaceWith(footerTemplate.content);
