import '../css/style.css';
import 'flowbite';

// 1. Inicializar carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem("carrito-urbankicks")) || [];

// 2. Función para actualizar el número pequeño del icono del carrito
const actualizarContadorGlobal = () => {
    const contadores = document.querySelectorAll("#carrito-contador, .absolute.-top-2.-right-2");
    contadores.forEach(c => {
        if (c) c.innerText = carrito.length;
    });
};

// 3. Delegación de eventos para capturar clics en botones de "Agregar"
// Funciona tanto para el index.html como para el catalogo.html
document.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("btn-agregar") || e.target.closest("button")?.innerText === "Agregar") {
        const boton = e.target.closest("button");
        const card = boton.closest(".group, .bg-white"); // Busca el contenedor del producto
        
        const producto = {
            titulo: card.querySelector("h3").innerText,
            precio: card.querySelector(".font-bold, .text-indigo-700").innerText.replace('$', ''),
            imagen: card.querySelector("img").src
        };

        carrito.push(producto);
        localStorage.setItem("carrito-urbankicks", JSON.stringify(carrito));
        actualizarContadorGlobal();
        
        // Opcional: Feedback visual
        boton.innerText = "¡Añadido!";
        boton.classList.replace("bg-slate-900", "bg-emerald-600");
        setTimeout(() => {
            boton.innerText = "Agregar";
            boton.classList.replace("bg-emerald-600", "bg-slate-900");
        }, 1000);
    }
});

// Ejecutar al cargar la página
actualizarContadorGlobal();