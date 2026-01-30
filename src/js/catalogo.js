import '../css/style.css';
import 'flowbite';

// 1. Inicializar carrito
let carrito = JSON.parse(localStorage.getItem("carrito-urbankicks")) || [];

// 2. Función para actualizar el contador visual del menú
const actualizarContadorGlobal = () => {
    const contador = document.querySelector(".absolute.-top-2.-right-2");
    if (contador) contador.innerText = carrito.length;
};

// 3. Escuchar clics en el contenedor del catálogo (Delegación de eventos)
document.addEventListener("click", (e) => {
    // Verificamos si el clic fue en un botón que dice "Agregar"
    if (e.target && e.target.tagName === 'BUTTON' && e.target.innerText.includes("Agregar")) {
        const boton = e.target;
        const card = boton.closest(".bg-white"); // Encuentra la tarjeta del producto

        // Extraer datos
        const titulo = card.querySelector("h3").innerText;
        // Limpiamos el precio para quedarnos solo con el número
        const precioRaw = card.querySelector(".font-semibold, .font-bold").innerText;
        const precio = precioRaw.replace('$', '').trim();
        const imagen = card.querySelector("img").src;

        // Crear objeto
        const producto = { titulo, precio, imagen };

        // Guardar
        carrito.push(producto);
        localStorage.setItem("carrito-urbankicks", JSON.stringify(carrito));
        
        // Actualizar UI
        actualizarContadorGlobal();

        // Feedback visual al botón
        const originalText = boton.innerText;
        boton.innerText = "¡Añadido!";
        boton.classList.add("bg-emerald-600");
        setTimeout(() => {
            boton.innerText = originalText;
            boton.classList.remove("bg-emerald-600");
        }, 800);
    }
});

// Cargar contador al iniciar
actualizarContadorGlobal();