import '../css/style.css';
import 'flowbite';

const lista = document.getElementById("lista-carrito");
const totalPago = document.getElementById("total-compra");
const btnLimpiar = document.getElementById("btn-limpiar");

let carrito = JSON.parse(localStorage.getItem("carrito-urbankicks")) || [];

const actualizarContador = () => {
    const contador = document.querySelector(".absolute.-top-2.-right-2");
    if (contador) contador.innerText = carrito.length;
};

const mostrarCarrito = () => {
    if (!lista) return;
    lista.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        lista.innerHTML = `<p class="text-center text-slate-500 py-10">Tu carrito está vacío.</p>`;
        totalPago.innerText = "$0.00";
        actualizarContador();
        return;
    }

    carrito.forEach((prod, index) => {
        total += parseFloat(prod.precio);

        lista.innerHTML += `
            <div class="flex items-center justify-between border-b border-slate-200 py-4">
                <div class="flex items-center gap-4">
                    <img src="${prod.imagen}" class="w-16 h-16 object-cover rounded-lg">
                    <div>
                        <p class="font-bold text-slate-800">${prod.titulo}</p>
                        <p class="text-indigo-600 font-bold">$${prod.precio}</p>
                    </div>
                </div>
                <button data-index="${index}" class="btn-eliminar text-red-500 hover:text-red-700 p-2">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        `;
    });

    totalPago.innerText = `$${total.toFixed(2)}`;
    actualizarContador();
};

// Evento para eliminar
lista?.addEventListener("click", (e) => {
    const boton = e.target.closest(".btn-eliminar");
    if (boton) {
        const index = parseInt(boton.dataset.index);
        carrito.splice(index, 1);
        localStorage.setItem("carrito-urbankicks", JSON.stringify(carrito));
        mostrarCarrito();
    }
});

// Evento para limpiar
btnLimpiar?.addEventListener("click", () => {
    carrito = [];
    localStorage.setItem("carrito-urbankicks", JSON.stringify(carrito));
    mostrarCarrito();
});

mostrarCarrito();