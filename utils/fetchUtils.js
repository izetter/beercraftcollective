const productsEndpoint = 'https://beercraftservice.onrender.com/api/v1/products'; // Endpoint MUST NOT end with a forward slash " / "

async function getAllProducts(url = productsEndpoint) {
	const response = await fetch(url);
	const products = await response.json();
	console.log(products);
	return products;
}

async function deleteProduct(id) {
	await fetch(`${productsEndpoint}/${id}`, {
		method: 'DELETE',
	});
	// Server does not return anything upon product deletion.
}

export const fetchUtils = { getAllProducts, deleteProduct };
