import { fetchUtils } from './fetchUtils';

export class BeerController {
	#items;

	constructor(beers) {
		this.#items = beers;
		console.log(this.#items);
		this.updateLocalStorage();
	}

	static #validProps = new Set(['id', 'name', 'style', 'origin', 'price', 'size', 'abv', 'img']);
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
		localStorage.setItem('products', JSON.stringify(this.#items));
	}

	addBeer({ name, style, origin, price, size, abv, img }) {
		const beer = {
			id: crypto.randomUUID(),
			name,
			style,
			origin,
			price,
			size,
			abv,
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
		fetchUtils.deleteProduct(id);
		let removedBeer = null;
		this.#items = this.#items.filter((beer) => {
			if (beer.id !== Number(id)) {
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
