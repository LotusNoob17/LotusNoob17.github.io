import { providerf, loginpopupfacebook, Addregister, obtenerCorreosUsuarios } from "../controller/firebase.js";


console.log('Script cargado');

const facebookLoginBtn = document.getElementById('facebookloginbtn');

async function iniciarfacebook() {
    console.log('Función iniciarfacebook llamada');
    try {
        console.log('Llamada a loginpopupfacebook');
        const userCredential = await loginpopupfacebook(providerf); 
        const user = userCredential.user;
        const email = user.email; // el correo electrónico del usuario

        const identi = 'sin definir';
        const Nombre = 'sin definir';
        const Rol = 'Usuario';
        const Direccion = 'sin definir';
        const Telefono = 'sin definir';
        const RH = 'sin definir';
        const Genero = 'sin definir';
        const password = 'sin definir';

        const querySnapshot = await obtenerCorreosUsuarios(email);

        if (querySnapshot.empty) {
            // si no se encontró ningún documento, crea uno nuevo
            const validar = await Addregister(identi, Nombre, Rol, Direccion, Telefono, RH, Genero, email, password);
            alert('Los datos se enviaron exitosamente..');
            window.location.href = "../templates/home.html";
        } else {
            console.log('Ya existe un documento con este correo.');
            window.location.href = "../templates/home.html";
        }
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error al iniciar sesión:', errorCode, errorMessage);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado');
    facebookLoginBtn.addEventListener('click', iniciarfacebook);
});