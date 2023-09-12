import { BeerController } from '../../utils/BeerController.js';
import { navbar } from '../../components/navbar.js';
import { footer } from '../../components/footer.js';
import { productCard } from '../../components/productCard.js';

const alertPlaceholder = document.getElementById('liveAlertPlaceholder');

const formProduct = document.forms['form-product'];
const name = formProduct.elements['name'];
const style = formProduct.elements['style'];
const origin = formProduct.elements['origin'];
const price = formProduct.elements['price'];
const size = formProduct.elements['size'];
const abv = formProduct.elements['abv'];

// const img = formProduct.elements['image'];

const $inputsFormProduct = [name, style, origin, price, size, abv];

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
	const validationInputsForm = productFormValidation();

	if (validationInputsForm) {
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
		$inputsFormProduct.forEach((input) => {
			setDefaultInput(input);
		});
		showProducts();
	}
	// else {
	// // 	alert('Verifique que los campos no esten vacios y contengan los datos correctos');
	// Quise crear una alerta con la funcion renderMessageError pero no logre que desapareciera al volver enviar el formulario
	// // }
}

//funcion para mostrar productos
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

//funciones para renderizar error/succes en los inputs
function setDefaultInput(input) {
	input.classList.remove('is-valid', 'is-invalid');
	input.classList.add('border-dark-subtle');
}
const setError = ($input) => {
	$input.classList.remove('is-valid');
	$input.classList.add('is-invalid');
};
const setSuccess = ($input) => {
	$input.classList.remove('is-invalid');
	$input.classList.add('is-valid');
};

$inputsFormProduct.forEach(($input) => {
	$input.addEventListener('blur', () => {
		validateInputs($input);
	});
});

///validaciones de los inputs

function validateInputs($input) {
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

function productFormValidation() {
	let isValid = true;

	$inputsFormProduct.forEach(($input) => {
		if (!validateInputs($input)) {
			isValid = false;
		}
	});

	return isValid;
}

// function renderMessageError() {
// 	const $div = document.createElement('div');
// 	$div.classList.add('alert', 'alert-danger');
// 	$div.textContent = 'Verifique que los campos no esten vacios y contengan los datos correctos';
// 	alertPlaceholder.append($div);
// }

const navTemplate = document.createElement('template');
navTemplate.innerHTML = navbar();
document.querySelector('nav').replaceWith(navTemplate.content);

const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = footer();
document.querySelector('footer').replaceWith(footerTemplate.content);
