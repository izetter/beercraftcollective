import { navbar } from './components/navbar.js';
import { footer } from './components/footer.js';
import { productCard } from './components/productCard.js';

const productSection = document.getElementById('product-section');
const products = JSON.parse(localStorage.getItem('products'));
products.forEach((product) => {
	const cardTemplate = document.createElement('template');
	cardTemplate.innerHTML = productCard(product);
	productSection.append(cardTemplate.content);
});

const navTemplate = document.createElement('template');
navTemplate.innerHTML = navbar();
document.querySelector('nav').replaceWith(navTemplate.content);

const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = footer();
document.querySelector('footer').replaceWith(footerTemplate.content);
