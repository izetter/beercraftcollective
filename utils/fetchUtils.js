const productsEndpoint = 'https://beercraftservice.onrender.com/api/v1/products'; // Base endpoint MUST NOT end with a forward slash " / ", it won't work otherwise.

async function createProduct(productData) {
	const response = await fetch(productsEndpoint, {
		method: 'POST',
		body: JSON.stringify(productData),
		headers: { 'Content-Type': 'application/json' },
	});
	const parsedResponse = await response.json();
	return parsedResponse;
}

async function getAllProducts(url = productsEndpoint) {
	const response = await fetch(url);
	const products = await response.json();
	return products;
}

async function deleteProduct(id) {
	await fetch(`${productsEndpoint}/${id}`, {
		method: 'DELETE',
	});
	// Server does not return anything upon product deletion.
}

export const fetchUtils = { createProduct, getAllProducts, deleteProduct };
