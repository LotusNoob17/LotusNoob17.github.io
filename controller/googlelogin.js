import { provider, loginpopupgoogle, Addregister, obtenerCorreosUsuarios} from "../controller/firebase.js";

console.log('Script cargado');

const googleLoginBtn = document.getElementById('googleloginbtn');

async function iniciargoogle() {
    console.log('Función iniciargoogle llamada');
    try {
        console.log('Llamada a loginpopupgoogle');
        const userCredential = await loginpopupgoogle(provider); 
        const user = userCredential.user;
        const email = user.email; //el correo electrónico del usuario

        const identi = 'sin definir';
        const Nombre = 'sin definir';
        const Rol = 'Usuario';
        const Direccion = 'sin definir';
        const Telefono = 'sin definir';
        const RH = 'sin definir';
        const Genero = 'sin definir';
        const password = 'sin definir';

        // buscar documentos con el mismo correo
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
    googleLoginBtn.addEventListener('click', iniciargoogle);
});
