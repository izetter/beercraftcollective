import { navbar } from './components/navbar.js';
import { footer } from './components/footer.js';
import { productCard } from './components/productCard.js';
import { sampleProductListTestAfterSubmitMOCK } from './assets/sampleProductListTestAfterSubmitMOCK.js';

const productSection = document.getElementById('product-section');
const products = JSON.parse(localStorage.getItem('products'));

// If there are products in local storage, render them. If there are not,
// set them in local storage with the sample and then render them from local storage.
if (products !== null) {
	products.forEach((product) => {
		const cardTemplate = document.createElement('template');
		cardTemplate.innerHTML = productCard(product);
		productSection.append(cardTemplate.content);
	});
} else {
	localStorage.setItem('products', JSON.stringify(sampleProductListTestAfterSubmitMOCK));
	const sampleProducts = localStorage.getItem('products');
	sampleProducts.forEach((product) => {
		const cardTemplate = document.createElement('template');
		cardTemplate.innerHTML = productCard(product);
		productSection.append(cardTemplate.content);
	});
}

const navTemplate = document.createElement('template');
navTemplate.innerHTML = navbar();
document.querySelector('nav').replaceWith(navTemplate.content);

const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = footer();
document.querySelector('footer').replaceWith(footerTemplate.content);
