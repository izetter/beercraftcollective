import { footer } from '../../components/footer.js';
import { navbar } from '../../components/navbar.js';

const navElement = document.createElement('nav');
navElement.innerHTML = navbar();
document.querySelector('nav').replaceWith(navElement);

const footerElement = document.createElement('footer');
footerElement.innerHTML = footer();
document.querySelector('footer').replaceWith(footerElement);
