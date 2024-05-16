import { auth, EliminarUsuario } from "../controller/firebase.js";

console.log('Script DeleteUser.js cargado');

const DeleteBtn = document.getElementById('DeleteUserbtn');

async function borrar() {
    console.log('Función borrar llamada');
    try {
        await EliminarUsuario(auth);
        alert('Usuario eliminado');
        window.location.href = "../index.html";
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Error: ${errorCode}\n${errorMessage}`);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado');
    DeleteBtn.addEventListener('click', borrar);
});