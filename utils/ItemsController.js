import { sampleProductList } from '../assets/sampleProductList.js';

class BeerController {
	constructor() {
		this.items = [];
	}

	static #validProps = new Set(['id', 'name', 'style', 'origin', 'img', 'price', 'ABV', 'size']);
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

	// For the Web Crypto API to work, it should be running in a server (like live server) or node v19 and up
	addBeer(name, style, origin, ABV, img) {
		const beer = {
			id: crypto.randomUUID(),
			name,
			style,
			origin,
			ABV,
			img,
		};
		this.items.push(beer);
		return beer;
	}

	getBeer(id) {
		return this.items.find((beer) => beer.id === id);
	}

	updateBeer(id, propsToEdit) {
		try {
			BeerController.validateUpdateProps(propsToEdit);
			for (let i = 0; i < this.items.length; i++) {
				if (this.items[i].id === id) {
					this.items[i] = { ...this.items[i], ...propsToEdit };
					return this.items[i];
				}
			}
		} catch (error) {
			return error;
		}
	}

	removeBeer(id) {
		let removedBeer = null;
		this.items = this.items.filter((beer) => {
			if (beer.id !== id) {
				removedBeer = beer;
				return true;
			}
		});
		return removedBeer;
	}
}

const beerController = new BeerController();
sampleProductList.forEach((beer) => beerController.addBeer(beer.name, beer.style, beer.origin, beer.ABV));
console.log(beerController.items);
