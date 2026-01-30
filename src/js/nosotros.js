import '../css/style.css'
import 'flowbite'

/**
 * Función para sincronizar el contador del carrito con el almacenamiento local.
 */
const actualizarContadorGlobal = () => {
    // 1. Obtener el carrito actual de UrbanKicks
    const carrito = JSON.parse(localStorage.getItem("carrito-urbankicks")) || [];
    
    // 2. Localizar el elemento del contador en la Navbar
    const contadorElemento = document.getElementById("cart-count");
    
    if (contadorElemento) {
        // 3. Actualizar el texto
        const cantidadTotal = carrito.length;
        contadorElemento.innerText = cantidadTotal;

        // 4. Dinamismo visual: Si hay items, destacar el color
        if (cantidadTotal > 0) {
            contadorElemento.classList.remove('bg-slate-900');
            contadorElemento.classList.add('bg-emerald-500'); // Cambia a verde si hay productos
        } else {
            contadorElemento.classList.remove('bg-emerald-500');
            contadorElemento.classList.add('bg-slate-900');
        }
    }
};

// Se ejecuta al cargar el DOM para que el usuario vea sus cambios de inmediato
document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorGlobal();
    
    // Efecto de entrada para las secciones de texto (Opcional)
    console.log("Página Nosotros cargada correctamente.");
});