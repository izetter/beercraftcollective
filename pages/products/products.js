import { BeerController } from '../../utils/BeerController.js';
import { navbar } from '../../components/navbar.js';
import { footer } from '../../components/footer.js';
import { productCard } from '../../components/productCard.js';

const formProduct = document.forms['form-product'];
const name = formProduct.elements['name'];
const style = formProduct.elements['style'];
const origin = formProduct.elements['origin'];
const price = formProduct.elements['price'];
const size = formProduct.elements['size'];
const abv = formProduct.elements['abv'];
// const img = formProduct.elements['image'];

const newProducts = new BeerController();

// Recupera la lista de productos de localStorage (si existe)
const storedProducts = JSON.parse(localStorage.getItem('products'));
if (storedProducts) {
	newProducts.items = storedProducts;
	showProducts();
}

formProduct.addEventListener('submit', addProduct);

function addProduct(event) {
	event.preventDefault();

	const nameValue = name.value;
	const styleValue = style.value;
	const originValue = origin.value;
	const priceValue = price.value;
	const sizeValue = size.value;
	const abvValue = abv.value;
	// const imgValue = img.files[0];

	const newBeer = {
		name: nameValue,
		style: styleValue,
		origin: originValue,
		price: priceValue,
		size: sizeValue,
		ABV: abvValue,
		img: '',
		// img: URL.createObjectURL(imgValue),
	};

	newProducts.addBeer(newBeer);
	formProduct.reset();

	// Actualiza localStorage con la lista actualizada de productos
	// Later maybe refactor this so all local storage handling is done within BeerController ?
	localStorage.setItem('products', JSON.stringify(newProducts.items));
	showProducts();
}

function showProducts() {
	const productSection = document.getElementById('product-section');
	const productsLocalStorage = JSON.parse(localStorage.getItem('products'));

	productSection.innerText = '';

	productsLocalStorage.forEach((beer) => {
		const cardTemplate = document.createElement('template');
		cardTemplate.innerHTML = productCard(beer);
		productSection.append(cardTemplate.content);
	});
}

const navTemplate = document.createElement('template');
navTemplate.innerHTML = navbar();
document.querySelector('nav').replaceWith(navTemplate.content);

const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = footer();
document.querySelector('footer').replaceWith(footerTemplate.content);
