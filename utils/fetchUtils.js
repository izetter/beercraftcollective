const productsEndpoint = 'https://beercraftservice.onrender.com/api/v1/products';

export async function getAllProducts(url = productsEndpoint) {
	const response = await fetch(url);
	const products = await response.json();
	console.log(products);
	return products;
}
