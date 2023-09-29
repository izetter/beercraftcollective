export class CartManager {
	// Set up the items and currentId property in the contructor
	constructor(currentId = 1) {
		this.items = [];
		this.currentId = currentId;
	}

	addItem(product) {
		const { id, name, style, price, quantity = 1, img } = product;
		const idProductoRepetido = this.items.find((e) => e.id === id);
		if (idProductoRepetido) {
			product.quantity++;
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
			alert('Se Agrego el producto');
		}

		// Toastify({
		// 	text: "Se ha agreado un producto al carrito",
		// 	duration: 3000,
		// 	newWindow: true,
		// 	close: true,
		// 	gravity: "bottom", // `top` or `bottom`
		// 	position: "right", // `left`, `center` or `right`
		// 	stopOnFocus: true, // Prevents dismissing of toast on hover

		// 	style: {
		// 	  background: "linear-gradient(to right, #00b09b, #96c93d)",
		// 	},
		//   }).showToast();

		localStorage.setItem('carritoCompras', JSON.stringify(this.items));
	}

	removeItem(productId) {
		this.items = this.items.filter((product) => product.id !== productId);
	}

	getTotal() {
		return this.items.reduce((total, product) => total + product.price, 0);
	}

	showItems() {
		return this.items;
	}
}
