import { auth, eliminarUsuario, eliminarusuarioProvider } from "../controller/firebase.js";

console.log('Script DeleteUser.js cargado');

const DeleteBtn = document.getElementById('DeleteUserbtn');

async function borrar() {
    console.log('Función borrar llamada');
    try {
        // Obtén el correo electrónico del usuario actual
        const email = auth.currentUser.email;

        // Verifica el proveedor de inicio de sesión
        const provider = auth.currentUser.providerData[0].providerId;

        if (provider === 'password') {
            // Si el usuario inició sesión con correo electrónico y contraseña
            // Pide la contraseña al usuario
            const password = prompt('Por favor, introduce tu contraseña para continuar con la eliminación de la cuenta');
            await eliminarUsuario(email, password);
        } else if (provider === 'google.com' || provider === 'facebook.com') {
            // Si el usuario inició sesión con Google o Facebook
            await eliminarusuarioProvider(email);
        }

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
