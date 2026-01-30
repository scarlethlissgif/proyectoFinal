import '../css/style.css'
import 'flowbite'




const nombre = document.getElementById("usuario");
const email = document.getElementById("email");
const telefono = document.getElementById("telefono")
const contraseña = document.getElementById("contraseña");
const confirmContra = document.getElementById("confirmContra");
const formulario = document.getElementById("formulario");
const mensaje = document.getElementById("mensaje");

const patrones = {
    usuario: /^[a-zA-ZÀ-ÿ\s]{3,16}$/, // Letras y espacios (3-16 caracteres)
    correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, // Formato email
    contraseña: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, // Mínimo 8 caracteres, 1 letra y 1 número
    telefono: /^(\+593|0)9\d{8}$/ // Ecuador: +5939xxxxxxxx o 09xxxxxxxx
}


//funcion para habilitar el mensaje de error
const mostrarError = (input, idError) => {
    const mensaje = document.getElementById(idError);
    //si el mensaje existe le quitamos la clase hidden para que sea visible
    if (mensaje) mensaje.classList.remove("hidden");
    input.classList.add("border-red-500");
    input.classList.remove("border-slate-300");
}

//funcion para eliminar error
const eliminarError = (input, idError) => {
    const mensaje = document.getElementById(idError);
    //ocultar el span
    if (mensaje) mensaje.classList.add("hidden");
    input.classList.remove("border-red-500");
    input.classList.add("border-green-700");
}

//maneja el evento principal validacion de fomurlario 

formulario.addEventListener("submit", (e) => {
    e.preventDefault(); //evita que la pagina se actualice
    let formularioValido = true;

    //validacion del nombre
    if (!patrones.usuario.test(nombre.value)) {
        mostrarError(nombre, "error-usuario");
        formularioValido = false;
    } else {
        eliminarError(nombre, "error-usuario");
    }

    //validacion de telefono
    if (!patrones.telefono.test(telefono.value)) {
        mostrarError(telefono, "error-telefono");
        formularioValido = false;
    } else {
        eliminarError(telefono, "error-telefono");
    }

    //validacion del email
    if (!patrones.correo.test(email.value)) {
        mostrarError(email, "error-email");
        formularioValido = false;
    } else {
        eliminarError(email, "error-email");
    }
    //validacion contraseña
    if (!patrones.contraseña.test(contraseña.value)) {
        mostrarError(contraseña, "error-contraseña");
        formularioValido = false;
    } else {
        eliminarError(contraseña, "error-contraseña");
    }
    //validacion de contraseñas iguales
    if (contraseña.value !== confirmContra.value || confirmContra.value === "") {
        mostrarError(confirmContra, "error-confirmContra");
        formularioValido = false;
    } else {
        eliminarError(confirmContra, "error-confirmContra");
    }

    //validacion de mensaje
    if (mensaje.value.trim().length < 10) { //trim - se usa para eliminar los espacios en blanco al inicio y al final de un texto.cs
        mostrarError(mensaje, "error-mensaje");
        formularioValido = false;
    } else {
        eliminarError(mensaje, "error-mensaje");
    }

    if (formularioValido) {
        alert("Registro Exitoso!  :)");
        //limpiar los inputs
        formulario.reset();

    }
});





