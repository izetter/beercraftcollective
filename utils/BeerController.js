import { fetchUtils } from './fetchUtils';

export class BeerController {
	#items;

	constructor(beers) {
		this.#items = beers;
		// console.log(this.#items);
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
		console.log(1, 'updating LS', this.#items);
		localStorage.setItem('products', JSON.stringify(this.#items));
		console.log(2, 'LS:', JSON.parse(localStorage.getItem('products')));
	}

	async addBeer(beerData) {
		const newBeer = await fetchUtils.createProduct(beerData);
		console.log(newBeer);
		this.#items.push(newBeer);
		this.updateLocalStorage();
		return newBeer;
	}

	getBeer(id) {
		return this.#items.find((beer) => beer.id === id);
	}

	async updateBeer(id, propsToEdit) {
		try {
			BeerController.validateUpdateProps(propsToEdit);
			const updatedBeer = await fetchUtils.updateProduct(id, propsToEdit);
			console.log(typeof updatedBeer.id, updatedBeer.id);
			for (let i = 0; i < this.#items.length; i++) {
				if (this.#items[i].id === Number(updatedBeer.id)) {
					this.#items[i] = { ...this.#items[i], ...propsToEdit };
					this.updateLocalStorage();
					return this.#items[i];
				}
			}
		} catch (error) {
			console.log(error);
			return error;
		}
	}

	// See NOTE 1
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

/* NOTE 1
	If the API returned the deleted product (it returns nothing), it would be better to use that
	returned product id to filter (to avoid two sources of truth kind of thing).
	And removeBeer would have to be async if doing it that way
*/
