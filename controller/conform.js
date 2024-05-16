import { loginauth, obtenerCorreosUsuarios } from "../controller/firebase.js"

const caja = document.getElementById('formreg')
const boton = document.getElementById('loginbtn')

async function validar(){

    const email = caja['username'].value
    const password = caja['userpassword'].value

    if (email.trim() === '' || password.trim() === '') {
        alert("Por favor, ingresa tu correo electrónico y contraseña.");
        return; 
    }

    const verificar = loginauth(email, password)
    const validation = await verificar

    if (validation != null) {
        alert('User authentication succesful ' + email)
        const userSnapshot = await obtenerCorreosUsuarios(email);
        if (!userSnapshot.empty) {
            const userData = userSnapshot.docs[0].data();
            if (userData.Rol === 'Administrador') {
                window.location.href = "../templates/homeadm.html";
            } else if (userData.Rol === 'Usuario') {
                window.location.href = "../templates/home.html";
            }
        } else {
            console.error('No se encontró ningún usuario con el correo electrónico proporcionado');
        }
    } else {
        console.log('Sesion ' + email + ' not validation')
        alert('Error de usuario verifique usuario y/o contraseña')
    } 
}

    window.addEventListener('DOMContentLoaded', () => {
        console.log('DOM cargado');
        boton.addEventListener('click', validar);
    });


