import { navbar } from '../../components/navbar.js';
import { footer } from '../../components/footer.js';
import { productCard } from '../../components/productCard.js';
import { sampleProductList } from '../../assets/sampleProductList.js'; // This object is just to simulate the values ENTERED in the form, NOT to simulate the RESULTS of many form submissions that get processed by addBeer...
import { BeerController } from '../../utils/BeerController.js';

/* FLOW
1. User types data in the form, whose fileds each represent a different property
	of a beer object (name, style, price etc.)
	SEE NOTE 1

2. When the form is submitted, proper validation occurs and is shown
	to the user via Bootstrap alerts. If something's wrong, do not proceed.
	SEE NOTE 2

3. If the validation passes, have the addBeer method of the BeerController class
	use the values of the form fields as its arguments. addBeer will create
	a new beer object and it will push it to the array of beer items.
	SEE NOTE 3

4. Uset must be able to see the objects she created even after refreshing the tab.
	SEE NOTE 4

*/

/* NOTES
1. Do not ask the user for an id in the form, it is created automatically by
	the addBeer method of the BeerController class.


2.	All properties/keys of a beer object (form fields) are of type string, except for
	price, size, and ABV, which should be of type number.
	
	At the moment we can omit validation for empty strings on the
	img source form field, so the form should still pass validation
	if that field is left empty.


3. addBeer takes a single object as its parameter, that object is constructed
	from the values submitted in the form.
	
	The keys of that object MUST be exactly these (name, style, origin, price, size, ABV, img),
	-notice how there is no "id"-
	Example of that objec:

		{
			name: 'Principia - Extrasolar',
			style: 'IPA',
			origin: 'Monterrey, Nuevo León',
			price: 75,
			size: 350,
			ABV: 6.5,
			img: ''
		}


4. At this time, the objects created by addBeer are stored in a JS array variable of the
	BeerController instance (this.items), which we can easily see logged in the console or
	used as "database" to programatically render the beer cards to the DOM so
	the user can see the beers he creates.  However, this is not permanent...
		
	Part of what Tarea 8 asks is to have that array of beer objects stored
	in session or local storage instead of to a JS variable, and have the
	renderization to the DOM be done from the data stored there,
	so it is not reset everytime the page is refreshed

*/

const myBeers = new BeerController();
sampleProductList.forEach((beer) => myBeers.addBeer(beer));

const productSection = document.getElementById('product-section');
myBeers.items.forEach((beer) => {
	const cardTemplate = document.createElement('template');
	cardTemplate.innerHTML = productCard(beer);
	productSection.append(cardTemplate.content);
});

const navTemplate = document.createElement('template');
navTemplate.innerHTML = navbar();
document.querySelector('nav').replaceWith(navTemplate.content);

const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = footer();
document.querySelector('footer').replaceWith(footerTemplate.content);
