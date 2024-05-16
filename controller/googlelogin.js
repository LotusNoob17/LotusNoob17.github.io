import { provider, loginpopupgoogle} from "../controller/firebase.js";

console.log('Script cargado');

const googleLoginBtn = document.getElementById('googleloginbtn');

async function iniciargoogle() {
    console.log('Función iniciargoogle llamada');
    try {
        console.log('Llamada a loginpopupgoogle');
        const validation = loginpopupgoogle(provider); 
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
    googleLoginBtn.addEventListener('click', iniciargoogle);
});
