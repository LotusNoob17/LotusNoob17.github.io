import { auth, eliminarDatosUsuario } from "../controller/firebase.js";

console.log('Script DeleteUser.js cargado');

const DeleteBtn = document.getElementById('DeleteUserbtn');

async function borrar() {
    console.log('Función borrar llamada');
    // Pide confirmación al usuario antes de eliminar
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario? Esta acción es irreversible.')) {
        try {
            // Obtén el correo electrónico del usuario actual
            const email = auth.currentUser.email;

            // Elimina los datos del usuario en Firestore y la cuenta del usuario
            await eliminarDatosUsuario(email);

            alert('Usuario eliminado');
            window.location.href = "../index.html";
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`Error: ${errorCode}\n${errorMessage}`);
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado');
    DeleteBtn.addEventListener('click', borrar);
});
