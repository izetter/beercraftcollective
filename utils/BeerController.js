// import { sampleProductList } from '../assets/sampleProductList.js';

export class BeerController {
	#items;

	constructor() {
		this.#items = [];
	}

	static #validProps = new Set(['id', 'name', 'style', 'origin', 'price', 'size', 'ABV', 'img']);
	static validateUpdateProps(propsToEdit) {
		if (!propsToEdit || Object.keys(propsToEdit).length === 0) {
			throw new Error(`An object containing the key-value pairs to update must be provided`);
		}
		if (propsToEdit.id) throw new Error('The "id" property of a beer cannot be edited.');
		for (const prop in propsToEdit) {
			if (!BeerController.#validProps.has(prop)) {
				throw new Error(`"${prop}" is not a valid property name of a beer.`);
			}
		}
	}

	get items() {
		return this.#items;
	}

	set items(items) {
		this.#items = items;
	}

	updateLocalStorage() {
		localStorage.setItem('products', this.#items);
	}

	// Maybe add validation to addBeer ?
	addBeer({ name, style, origin, price, size, ABV, img }) {
		const beer = {
			id: crypto.randomUUID(),
			name,
			style,
			origin,
			price,
			size,
			ABV,
			img,
		};
		this.#items.push(beer);
		this.updateLocalStorage();
		return beer;
	}

	getBeer(id) {
		return this.#items.find((beer) => beer.id === id);
	}

	updateBeer(id, propsToEdit) {
		try {
			BeerController.validateUpdateProps(propsToEdit);
			for (let i = 0; i < this.#items.length; i++) {
				if (this.#items[i].id === id) {
					this.#items[i] = { ...this.#items[i], ...propsToEdit };
					this.updateLocalStorage();
					return this.#items[i];
				}
			}
		} catch (error) {
			return error;
		}
	}

	removeBeer(id) {
		let removedBeer = null;
		this.#items = this.#items.filter((beer) => {
			if (beer.id !== id) {
				return true;
			} else {
				removedBeer = beer;
				return false;
			}
		});
		this.updateLocalStorage();
		return removedBeer;
	}
}
