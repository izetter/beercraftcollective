import { navbar } from '../../components/navbar.js';
import { footer } from '../../components/footer.js';
import { BeerController } from '../../utils/BeerController.js';
import { productCardAdmin } from '../../components/productCardAdmin.js';

import { sampleProductListTestAfterSubmitMOCK } from '../../assets/sampleProductListTestAfterSubmitMOCK.js';

// FOOTER & NAVBAR ============================================================================================

const navTemplate = document.createElement('template');
navTemplate.innerHTML = navbar();
document.querySelector('nav').replaceWith(navTemplate.content);

const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = footer();
document.querySelector('footer').replaceWith(footerTemplate.content);

// INITIALIZATION ============================================================================================

const form = document.forms['form-product'];
const name = form.elements['name'];
const style = form.elements['style'];
const origin = form.elements['origin'];
const price = form.elements['price'];
const size = form.elements['size'];
const abv = form.elements['abv'];
// const img = formProduct.elements['image'];
const submitBtn = form.elements['submit-btn'];
const formInputs = [name, style, origin, price, size, abv];
const productSection = document.getElementById('product-section');
let isEditing = false;
let editId = null;

const beers = new BeerController();

// VALIDATION FUNCTIONS =======================================================================================

function setDefaultInput(input) {
	input.classList.remove('is-valid', 'is-invalid');
	input.classList.add('border-dark-subtle');
}

function setError($input) {
	$input.classList.remove('is-valid');
	$input.classList.add('is-invalid');
}

function setSuccess($input) {
	$input.classList.remove('is-invalid');
	$input.classList.add('is-valid');
}

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
		const validLength = $input.value.length >= 2 && $input.value.length <= 40;

		if (!validLength) {
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

function showProducts() {
	productSection.innerText = '';
	beers.items.forEach((beer) => {
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

function addProduct() {
	if (validateForm()) {
		const newBeer = {
			name: name.value,
			style: style.value,
			origin: origin.value,
			price: price.value,
			size: size.value,
			ABV: abv.value,
			img: '',
			// img: img.value,
		};
		beers.addBeer(newBeer);
		formInputs.forEach(($input) => setDefaultInput($input));
		form.reset();
		showProducts();
	}
}

function startEdit(beer) {
	document.body.scrollTop = document.documentElement.scrollTop = 0;
	editId = beer.id;
	name.value = beer.name;
	style.value = beer.style;
	origin.value = beer.origin;
	price.value = beer.price;
	size.value = beer.size;
	abv.value = beer.abv;
	isEditing = true;
	submitBtn.innerText = 'Guardar Cambios';
}

function saveEdit() {
	if (validateForm()) {
		const updatedBeerProps = {
			name: name.value,
			style: style.value,
			origin: origin.value,
			price: price.value,
			size: size.value,
			ABV: abv.value,
			img: '',
			// img: img.value,
		};
		beers.updateBeer(editId, updatedBeerProps);
		submitBtn.innerText = 'Agregar Cerveza';
		formInputs.forEach(($input) => setDefaultInput($input));
		form.reset();
		showProducts();
		isEditing = false;
		editId = null;
	}
}

function deleteProduct(id) {
	beers.removeBeer(id);
	showProducts();
}

// EXECUTION =================================================================================================

// TO ADD PRODUCTS TO LOCAL STORAGE FOR TESTING
// localStorage.setItem('products', JSON.stringify(sampleProductListTestAfterSubmitMOCK));

formInputs.forEach(($input) => {
	$input.addEventListener('blur', () => {
		validateInput($input);
	});
});

form.addEventListener('submit', (evt) => {
	evt.preventDefault();
	isEditing ? saveEdit() : addProduct();
});

productSection.addEventListener('click', (evt) => {
	if (evt.target.classList.contains('delete-btn')) deleteProduct(evt.target.dataset.id);
	if (evt.target.classList.contains('edit-btn')) startEdit(evt.target.dataset);
});

getBeersFromLocalStorage();
