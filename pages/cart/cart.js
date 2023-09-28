import { footer } from '../../components/footer.js';
import { navbar } from '../../components/navbar.js';
import { productCard } from '../../components/productCard.js';
import { Cart } from './order.js';

const footerElement = document.querySelector('footer');

footerElement.innerHTML = footer();

const navTemplate = document.createElement('template');
navTemplate.innerHTML = navbar();
document.querySelector('nav').replaceWith(navTemplate.content);

const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = footer();
document.querySelector('footer').replaceWith(footerTemplate.content);

//add product to the Cart
class Cart {
	buyProduct(e) {
		e.preventDefault();
		if (e.target.classList.contains('Comprar')) {
			const product = e.target.parentElement.parentElement;
			this.readProductData(productCard);
		}
	}

	readProductData(productCard) {
		const infoProduct = {
			img: productCard.querySelector('img').src,
			name: productCard.querySelector('h5').textContent,
			price: productCard.querySelector('.price span').textContent,
			id: productCard.querySelector('a').getAttribute('data-id'),
			amount: 1,
		};
		let productLs;
		productLs = this.obtainProductsLocalStorage();

		this.insertCart(infoProduct);
		const row = document.createElement('tr');
		row.innerHTML = ` <td> 
							<img src= "${productCard.img}" width= 100>
						</td> 
						<td>${productCard.name}</td>
						<td>${productCard.price}</td>
						<td>
							<a href= "#" class="delete-product fas fa-times-circle" data-id=${productCard.id}></a>
						</td>
						`;
		productList.appendChild(row);
		this.saveProductsLocalStorage(productCard);
	}
	deleteProduct(e) {
		let productCard, productID;
		if (e.target.classList.contains('boton-vaciar')) {
			e.target.parentElement.parentElement.remove();
			productCard = e.target.parentElement.parentElement;
			productID = productCard.querySelector('a').getAttribute('data-id');
		}
		this.deleteProductLocalStorage(productID);
	}
	vaciarCarrito(e) {
		e.preventDefault();
		while (productList.firstChild) {
			productList.removeChild(productList.firstChild);
		}
		this.emtyLocalStorage();
		return false;
	}
	saveProductsLocalStorage(productCard) {
		let product;
		product = this.obtainProductsLocalStorage();
		product.push(product);
		localStorage.setItem('productCard', JSON.stringify(product));
	}
	obtainProductsLocalStorage() {
		let productLs;
		if (localStorage.getItem('productCard') === null) {
			productLs = [];
		} else {
			productLs = JSON.parse(localStorage.getItem('productCard'));
		}
		return productLs;
	}
	deleteProductLocalStorage(productID) {
		let productLs = [];
		productLs = this.obtainProductsLocalStorage();
		productLs.forEach(function (productLs, index) {
			if (productLs.id === productID) {
				productLs.splice(index, 1);
			}
		});
		localStorage.setItem(productCard, JSON.stringify(productLs));
	}
	readLocalStorage() {
		let productLs;
		productLs = this.obtainProductsLocalStorage();
		productLs.forEach(function (productCard) {
			const row = document.createElement('tr');
			row.innerHTML = ` <td> 
								<img src= "${productCard.img}" width= 100>
							</td> 
							<td>${productCard.name}</td>
							<td>${productCard.price}</td>
							<td>
								<a href= "#" class="delete-product fas fa-times-circle" data-id=${productCard.id}></a>
							</td>
							`;
			productList.appendChild(row);
		});
	}
	aceptOrder(e) {
		e.preventDefault();
		location.href = 'index.html';
	}
}
