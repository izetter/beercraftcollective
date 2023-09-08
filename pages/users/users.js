import { footer } from '../../components/footer.js';
import { navbar } from '../../components/navbar.js';

const footerElement = document.querySelector('footer');

footerElement.innerHTML = footer();

const navTemplate = document.createElement('template');
navTemplate.innerHTML = navbar();
document.querySelector('nav').replaceWith(navTemplate.content);

const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = footer();
document.querySelector('footer').replaceWith(footerTemplate.content);