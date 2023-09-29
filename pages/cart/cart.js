/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */


import { footer } from '../../components/footer.js';
import { navbar } from '../../components/navbar.js';


const footerElement = document.querySelector('footer');
footerElement.innerHTML = footer();
const navTemplate = document.createElement('template');
navTemplate.innerHTML = navbar();
document.querySelector('nav').replaceWith(navTemplate.content);
const footerTemplate = document.createElement('template');
footerTemplate.innerHTML = footer();
document.querySelector('footer').replaceWith(footerTemplate.content);


//aqui empieza la programacion del carrito
const cards = document.getElementById('cards')
const items = document.getElementById('items')
const footer2 = document.getElementById('footer2')
const templateCard = document.getElementById('template-card').content
const templateFooter2 = document.getElementById('template-footer2').content
const templateCarrito = document.getElementById('template-carrito').content
const fragment = document.createDocumentFragment()
let carrito = {}

// Eventos
// El evento DOMContentLoaded es disparado cuando el documento HTML ha sido completamente cargado y parseado
document.addEventListener('DOMContentLoaded', e => { fetchData() });
cards.addEventListener('click', e => { addCarrito(e) });
items.addEventListener('click', e => { btnAumentarDisminuir(e) })

// Traer productos
const fetchData = async () => {
    const res = await fetch('api.json');
    const data = await res.json()
    // console.log(data)
    pintarCards(data)
}

// Pintar productos
const pintarCards = data => {
    data.forEach(item => {
        templateCard.querySelector('h5').textContent = item.img
        templateCard.querySelector('p').textContent = "$" + item.price
        templateCard.querySelector('button').dataset.name = item.name
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)
    })
    cards.appendChild(fragment)
}

// Agregar al carrito
const addCarrito = e => {
    if (e.target.classList.contains('btn-dark')) {
        // console.log(e.target.dataset.id)
        // console.log(e.target.parentElement)
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = item => {
    // console.log(item)
    const producto = {
        title: item.querySelector('h5').textContent,
        price: item.querySelector('p').textContent,
        name: item.querySelector('button').dataset.name,
        cantidad: 1
    }
    // console.log(producto)
    if (carrito.hasOwnProperty(producto.name)) {
        producto.cantidad = carrito[producto.name].cantidad + 1
    }

    carrito[producto.name] = { ...producto }
    
    pintarCarrito()
}

const pintarCarrito = () => {
    items.innerHTML = ''

    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('th').textContent = producto.name
        templateCarrito.querySelectorAll('td')[0].textContent = producto.title
        templateCarrito.querySelectorAll('td')[1].textContent = producto.cantidad
        templateCarrito.querySelector('span').textContent = producto.price * producto.cantidad
        
        //botones
        templateCarrito.querySelector('.btn-info').dataset.name = producto.name
        templateCarrito.querySelector('.btn-danger').dataset.name = producto.name

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
    })
    items.appendChild(fragment)

    pintarFooter()
}

const pintarFooter = () => {
    footer2.innerHTML = ''
    
    if (Object.keys(carrito).length === 0) {
        footer2.innerHTML = `
        <th scope="row" colspan="5">Carrito vacío</th>
        `
        return
    }
    
    // sumar cantidad y sumar totales
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0)
    const nprice = Object.values(carrito).reduce((acc, {cantidad, price}) => acc + cantidad * price ,0)
    // console.log(nprice)

    templateFooter2.querySelectorAll('td')[0].textContent = nCantidad
    templateFooter2.querySelector('span').textContent = nprice

    const clone = templateFooter2.cloneNode(true)
    fragment.appendChild(clone)

    footer2.appendChild(fragment)

    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })

}

const btnAumentarDisminuir = e => {
    // console.log(e.target.classList.contains('btn-info'))
    if (e.target.classList.contains('btn-info')) {
        const producto = carrito[e.target.dataset.name]
        producto.cantidad++
        carrito[e.target.dataset.name] = { ...producto }
        pintarCarrito()
    }

    if (e.target.classList.contains('btn-danger')) {
        const producto = carrito[e.target.dataset.name]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.name]
        } else {
            carrito[e.target.dataset.name] = {...producto}
        }
        pintarCarrito()
    }
    e.stopPropagation()
}