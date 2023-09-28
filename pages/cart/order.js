//import { productCard } from './components/productCard.js';
//import {productList} from '../../index.js';
const carro = new cart();
const cart = document.getElementById('cart');
const products = document.getElementById('productCard');
const productList = document.querySelector('productList');
const emptyCartBtn = document.getElementById('boton-vaciar');
const aceptOrderBtn = document.getElementById('acept-order');

cargarEventos();

function cargarEventos() {
	products.addEventListener('click', (e) => {
		carro.buyProduct(e);
	});
	cart.addEventListener('click', (e) => {
		carro.deleteProduct(e);
	});
	document.addEventListener('DOMContentLoaded', carro.readLocalStorage());
	aceptOrderBtn.addEventListener('click', (e) => {
		cart.aceptOrder(e);
	});
}
