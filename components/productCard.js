import defaultImg from '../assets/img/generic_beer.png';

export function productCard({ id, name, style, origin, price, size, ABV, img }) {
	const cartUrl = '/pages/cart/cart.html';

	return `
		<article class="col" data-id="${id}">
			<div class="card h-100 shadow-sm">
				<div class="text-center">
					<img src="${img || defaultImg}" class="card-img-top" alt="beer" />
				</div>
				<div class="card-body py-0">
					<h5 class="card-title py-0">${name}</h5>
				</div>

				<ul class="list-group list-group-flush">
					<li class="list-group-item">Estilo: <span class="text-muted">${style}</span></li>
					<li class="list-group-item">Origen: <span class="text-muted">${origin}</span></li>
					<li class="list-group-item">
						<span class="text-muted">
							<span data-tooltip="Porcentaje de Alcohol: ${ABV}%">ABV: ${ABV}%</span>
						</span>
					</li>
					<div class="card-footer">
					<div class="d-flex justify-content-between align-items-center">
						<div class="btn-group">
							<button type="button" class="btn btn-warning buy-button" data-product='${JSON.stringify({
								id,
								name,
								style,
								origin,
								price,
								size,
								ABV,
								img,
							})}'>Comprar</button>
						</div>
						<span>$${price}</span>
					</div>
				</div>
			</div>
		</article>
	`;
}
