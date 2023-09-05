import { navbar } from './components/navbar.js';
import { footer } from './components/footer.js';
import { productCard } from './components/productCard.js';
import { sampleProductList } from './assets/sampleProductList.js'; // This object is just to simulate the values ENTERED in the form, NOT to simulate the RESULTS of many form submissions that get processed by addBeer...
import { BeerController } from './utils/BeerController.js';

const myBeers = new BeerController();
sampleProductList.forEach((beer) => myBeers.addBeer(beer));

const productSection = document.getElementById('product-section');
myBeers.items.forEach((beer) => {
	const cardTemplate = document.createElement('template');
	cardTemplate.innerHTML = productCard(beer);
	productSection.append(cardTemplate.content);
});

const navTemplate = document.createElement('template');
navTemplate.innerHTML = navbar();
document.querySelector('nav').replaceWith(navTemplate.content);

const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = footer();
document.querySelector('footer').replaceWith(footerTemplate.content);
