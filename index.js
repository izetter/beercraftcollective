import { navbar } from './components/navbar.js';
import { footer } from './components/footer.js';
import { productCard } from './components/productCard.js';
import { sampleProductListTestAfterSubmitMOCK } from './assets/sampleProductListTestAfterSubmitMOCK.js';
import { getAllProducts } from './utils/fetchUtils.js';

const searchInput = document.querySelector('#search-items');
const notFound = document.querySelector('#beer-not-found');

const productSection = document.getElementById('product-section');
let products = JSON.parse(localStorage.getItem('products'));

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
	matchingProducts.length === 0 ? (notFound.style.display = 'block') : (notFound.style.display = 'none');
	showProducts(matchingProducts);
}

// If there are products in local storage, render them. If there are not,
// set them in local storage with the sample and then render them from local storage.

(async () => {
	if (products) {
		showProducts(products);
	} else {
		const fetchedProducts = await getAllProducts();
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
