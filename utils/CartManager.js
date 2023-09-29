export class CartManager {
	// Set up the items and currentId property in the contructor
	constructor(currentId = 1) {
		this.items = [];
		this.currentId = currentId;
		this.subtotalCompra;
	}

	addItem(product) {
		const { id, name, style, price, quantity = 1, img } = product;
		const idProductoRepetido = this.items.find((e) => e.id === id);
		if (idProductoRepetido) {
			idProductoRepetido.quantity++;
		} else {
			const product = {
				id: id,
				name: name,
				style: style,
				img: img,
				price: price,
				quantity: quantity,
			};

			this.items.push(product);
		}

		localStorage.setItem('carritoCompras', JSON.stringify(this.items));
		alert('Se Agrego el producto');
	}

	removeItem(productId) {
		this.items = this.items.filter((product) => product.id !== productId);
	}

	getTotal() {
		return this.items.reduce((total, product) => total + product.price, 0);
	}

	quantityProducts() {
		let totalItems = 0;
		totalItems = this.items.reduce((acumulador, elemento) => acumulador + elemento.quantity, 0);
		return totalItems;
	}

	amount() {
		this.subtotalCompra = this.items.reduce(
			(acumulador, elemento) => acumulador + elemento.precio * elemento.cantidad,
			0
		);
		return this.subtotalCompra;
	}

	showItems() {
		return this.items;
	}
}
