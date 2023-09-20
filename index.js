import { navbar } from './components/navbar.js';
import { footer } from './components/footer.js';
import { productCard } from './components/productCard.js';
import { sampleProductListTestAfterSubmitMOCK } from './assets/sampleProductListTestAfterSubmitMOCK.js';

const searchInput = document.querySelector('#search-items');

const productSection = document.getElementById('product-section');
const products = JSON.parse(localStorage.getItem('products'));

function showProducts(productList) {
	productList.forEach((product) => {
		const cardTemplate = document.createElement('template');
		cardTemplate.innerHTML = productCard(product);
		productSection.append(cardTemplate.content);
	});
}

function handleInput() {
	const searchStr = searchInput.value.toLocaleLowerCase('en-US');
	const matchingProducts = products.filter((product) => {
		if (
			product.name.toLocaleLowerCase('en-US').includes(searchStr) ||
			product.style.toLocaleLowerCase('en-US').includes(searchStr) ||
			product.origin.toLocaleLowerCase('en-US').includes(searchStr)
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
