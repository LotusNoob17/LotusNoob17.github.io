import { providerf, loginpopupfacebook } from "../controller/firebase.js";

console.log('Script cargado');

const facebookLoginBtn = document.getElementById('facebookloginbtn');

async function iniciarfacebook() {
    console.log('Función iniciarfacebook llamada');
    try {
        console.log('Llamada a loginpopupfacebook');
        const validation = loginpopupfacebook(providerf); 
        const verificar = await validation;
        console.log('Inicio de sesión exitoso');
        window.location.href = "../templates/home.html";
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
