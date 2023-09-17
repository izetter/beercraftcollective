import { navbar } from '../../components/navbar.js';
import { footer } from '../../components/footer.js';
import { BeerController } from '../../utils/BeerController.js';
import { productCardAdmin } from '../../components/productCardAdmin.js';

// FOOTER & NAVBAR ============================================================================================

const navTemplate = document.createElement('template');
navTemplate.innerHTML = navbar();
document.querySelector('nav').replaceWith(navTemplate.content);

const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = footer();
document.querySelector('footer').replaceWith(footerTemplate.content);

// INITIALIZATION ============================================================================================

const formProduct = document.forms['form-product'];
const name = formProduct.elements['name'];
const style = formProduct.elements['style'];
const origin = formProduct.elements['origin'];
const price = formProduct.elements['price'];
const size = formProduct.elements['size'];
const abv = formProduct.elements['abv'];
// const img = formProduct.elements['image'];
const formInputs = [name, style, origin, price, size, abv];
// const deleteButtons = document.querySelectorAll('article button.delete-btn');

const beers = new BeerController();

// VALIDATION FUNCTIONS =======================================================================================

function setDefaultInput(input) {
	input.classList.remove('is-valid', 'is-invalid');
	input.classList.add('border-dark-subtle');
}

function setError($input) {
	$input.classList.remove('is-valid');
	$input.classList.add('is-invalid');
};

function setSuccess($input) {
	$input.classList.remove('is-invalid');
	$input.classList.add('is-valid');
};

function validateInput($input) {
	if ($input === abv) {
		const regExABV = /^(\d{1,2}(\.\d{0,1})?)$/;
		const validRegex = regExABV.test($input.value);

		if (!validRegex) {
			setError($input);
			return false;
		} else {
			setSuccess($input);
			return true;
		}
	} else if ($input === price || $input === size) {
		// Para campos price y size, verificar si son números enteros
		const validInteger = /^\d+$/.test($input.value);

		if (!validInteger) {
			setError($input);
			return false;
		} else {
			setSuccess($input);
			return true;
		}
	} else if ($input === name || $input === origin || $input === style) {
		// Para campos name, origin y style, verificar letras y espacios, y longitud entre 3 y 15 caracteres
		const validLetters = /^[A-Za-z\s]+$/.test($input.value);
		const validLength = $input.value.length >= 3 && $input.value.length <= 40;

		if (!validLetters || !validLength) {
			setError($input);
			return false;
		} else {
			setSuccess($input);
			return true;
		}
	}
}

function validateForm() {
	let isValid = true;

	formInputs.forEach(($input) => {
		if (!validateInput($input)) {
			isValid = false;
		}
	});

	return isValid;
}

// ADMIN FUNCTIONS ============================================================================================

function addProduct(event) {
	event.preventDefault();

	if (validateForm()) {
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

		beers.addBeer(newBeer);
		formProduct.reset();

		// Actualiza localStorage con la lista actualizada de productos
		// Later maybe refactor this so all local storage handling is done within BeerController ?
		localStorage.setItem('products', JSON.stringify(beers.items));
		formInputs.forEach(($input) => {
			setDefaultInput($input);
		});
		showProducts();
	}
}

function showProducts() {
	const productSection = document.getElementById('product-section');
	const productsLocalStorage = JSON.parse(localStorage.getItem('products'));

	productSection.innerText = '';

	productsLocalStorage.forEach((beer) => {
		const cardTemplate = document.createElement('template');
		cardTemplate.innerHTML = productCardAdmin(beer);
		productSection.append(cardTemplate.content);
	});
}

function getBeersFromLocalStorage() {
	const storedProducts = JSON.parse(localStorage.getItem('products'));
	if (storedProducts) {
		beers.items = storedProducts;
		showProducts();
	}
}

// function deleteProduct(evt) {
// 	const id = evt.target.dataset.id;
// 	beers.removeBeer(id);
// 	getBeersFromLocalStorage();
// 	console.log(id, 'deleted')
// 	window.location.reload();
// }

// EXECUTION =================================================================================================

formInputs.forEach(($input) => {
	$input.addEventListener('blur', () => {
		validateInput($input);
	});
});

// deleteButtons.forEach((button) => button.addEventListener('click', (evt) => deleteProduct(evt)))

formProduct.addEventListener('submit', addProduct);

// Recupera la lista de productos de localStorage (si existe)
getBeersFromLocalStorage();

