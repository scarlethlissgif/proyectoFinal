import '../css/style.css';
import 'flowbite';

let carrito = JSON.parse(localStorage.getItem("carrito-urbankicks")) || [];

const actualizarContadorGlobal = () => {
    const contador = document.querySelector(".absolute.-top-2.-right-2");
    if (contador) contador.innerText = carrito.length;
};

document.addEventListener("click", (e) => {
    if (e.target && e.target.tagName === 'BUTTON' && e.target.innerText.includes("Agregar")) {
        const boton = e.target;
        const card = boton.closest(".bg-white");

        const titulo = card.querySelector("h3").innerText;
        // Buscamos el span que contiene el precio
        const precioRaw = card.querySelector("span.font-semibold").innerText;
        
        // CORRECCIÓN: Limpieza profunda del precio (solo números y punto)
        const precioNumero = parseFloat(precioRaw.replace(/[^0-9.]/g, '')) || 0;
        const imagen = card.querySelector("img").src;

        const producto = { 
            titulo, 
            precio: precioNumero, // Guardamos como número real
            imagen 
        };

        carrito.push(producto);
        localStorage.setItem("carrito-urbankicks", JSON.stringify(carrito));
        
        actualizarContadorGlobal();

        // Feedback visual
        const originalText = boton.innerText;
        boton.innerText = "¡Añadido!";
        boton.classList.replace("bg-slate-900", "bg-emerald-600");
        setTimeout(() => {
            boton.innerText = originalText;
            boton.classList.replace("bg-emerald-600", "bg-slate-900");
        }, 800);
    }
});

actualizarContadorGlobal();