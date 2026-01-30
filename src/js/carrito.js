import '../css/style.css';

const lista = document.getElementById("lista-carrito");
const totalPago = document.getElementById("total-compra");
const btnLimpiar = document.getElementById("btn-limpiar");
const contadorNav = document.getElementById("cart-count");

let carrito = JSON.parse(localStorage.getItem("carrito-urbankicks")) || [];

const actualizarContador = () => {
    if (contadorNav) contadorNav.innerText = carrito.length;
};

const mostrarCarrito = () => {
    if (!lista) return;
    lista.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
        lista.innerHTML = `<div class="py-10 text-slate-400 text-lg">Tu carrito está vacío actualmente.</div>`;
        totalPago.innerText = "$0.00";
        actualizarContador();
        return;
    }

    carrito.forEach((prod, index) => {
        const precio = Number(prod.precio) || 0;
        total += precio;

        lista.innerHTML += `
            <div class="border-t border-slate-300 py-6 flex justify-between items-center">
                <p class="text-xl font-bold text-slate-900">${prod.titulo}</p>
                <div class="text-right">
                    <p class="text-xl font-bold text-orange-600">$${precio.toFixed(2)}</p>
                    <button data-index="${index}" class="btn-eliminar text-sm text-red-400 hover:text-red-600 font-medium">
                        Eliminar
                    </button>
                </div>
            </div>
        `;
    });

    // Línea final decorativa
    lista.innerHTML += `<div class="border-t border-slate-300"></div>`;
    
    totalPago.innerText = `$${total.toFixed(2)}`;
    actualizarContador();
};

// Eliminar un producto
lista?.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
        const index = parseInt(e.target.dataset.index);
        carrito.splice(index, 1);
        localStorage.setItem("carrito-urbankicks", JSON.stringify(carrito));
        mostrarCarrito();
    }
});

// Limpiar todo
btnLimpiar?.addEventListener("click", () => {
    if (confirm("¿Estás seguro de que quieres vaciar el carrito?")) {
        carrito = [];
        localStorage.setItem("carrito-urbankicks", JSON.stringify(carrito));
        mostrarCarrito();
    }
});

mostrarCarrito();