import { navbar } from '../../components/navbar.js';
import { footer } from '../../components/footer.js';
import { productCard } from '../../components/productCard.js';

// const productSection = document.getElementById('product-section');
// navElement.innerHTML = navbar();
// document.querySelector('nav').replaceWith(navElement);

const navTemplate = document.createElement('template');
navTemplate.innerHTML = navbar();
document.querySelector('nav').replaceWith(navTemplate.content);

const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = footer();
document.querySelector('footer').replaceWith(footerTemplate.content);
