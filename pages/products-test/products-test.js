import { navbar } from '../../components/navbar.js';
import { footer } from '../../components/footer.js';
import { productCard } from '../../components/productCard.js';
import { sampleProductListTest } from '../../assets/sampleProductListTest.js';
import { BeerController } from '../../utils/BeerController.js';

// const myBeers = new BeerController();

// const productSection = document.getElementById('product-section');

// sampleProductList;

// const cardTemplate = document.createElement('template');
// cardTemplate.innerHTML = productCard();
// document.querySelector('nav').replaceWith(cardTemplate.content);

const navTemplate = document.createElement('template');
navTemplate.innerHTML = navbar();
document.querySelector('nav').replaceWith(navTemplate.content);

const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = footer();
document.querySelector('footer').replaceWith(footerTemplate.content);
