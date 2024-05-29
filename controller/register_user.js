import { registerauth, enviar, Addregister } from "../controller/firebase.js";

const guardar = document.getElementById('registerbtn');

async function register() {
    const identi = document.getElementById('ident').value
    const Nombre = document.getElementById('name').value
    const Rol = document.getElementById('Rol').value;
    const Direccion = document.getElementById('adress').value
    const Telefono = document.getElementById('phone').value
    const RH = document.getElementById('blood').value
    const Genero = document.getElementById('Gene').value
    const email = document.getElementById('username').value;
    const confirmEmail = document.getElementById('confirm_email').value;
    const password = document.getElementById('userpassword').value;
    const confirmPassword = document.getElementById('confirm_password').value;


    if (!identi || !Nombre ||!Rol|| !Direccion || !Telefono || !RH || !Genero || !email || !confirmEmail || !password || !confirmPassword) {
        alert('Por favor, rellena todos los campos');
        return;
    }


    // Verificar que los campos de correo electrónico coincidan
    if (email !== confirmEmail) {
        alert('Los correos electrónicos no coinciden');
        return;
    }

    // Verificar que los campos de contraseña coincidan
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
    }

    // Verificar que la contraseña tenga al menos 8 caracteres
    if (password.length < 8) {
        alert('La contraseña debe tener al menos 8 caracteres');
        return;
    }

    // Verificar que la contraseña tenga al menos un carácter especial
    const specialCharacterRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (!specialCharacterRegex.test(password)) {
        alert('La contraseña debe contener al menos un carácter especial');
        return;
    }

    // Verificar que la contraseña tenga al menos una letra mayúscula
    const uppercaseLetterRegex = /[A-Z]/;
    if (!uppercaseLetterRegex.test(password)) {
        alert('La contraseña debe contener al menos una letra mayúscula');
        return;
    }

    try {
        const userCredential = await registerauth(email, password);
        // Signed up 
        const user = userCredential.user;
        console.log(user);
        enviar().then(() => {
            console.log('Correo de verificación enviado');
            
        }).catch((error) => {
            console.error('Error al enviar el correo de verificación: ', error);
        });

        alert('Registro exitoso. Por favor verifica tu correo electrónico.');
        return {identi, Nombre, Rol, Direccion, Telefono, RH, Genero, email, password}; // Devuelve los datos del usuario
    } catch (error) {
        alert('no sucessfull register');
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
    }  
} 


async function dates(userDetails){
    const {identi, Nombre, Rol, Direccion, Telefono, RH, Genero, email, password} = userDetails; // Extrae los detalles del usuario
    try {
        const validar = await Addregister(identi, Nombre, Rol, Direccion, Telefono, RH, Genero, email, password);
        alert('Los datos se enviaron exitosamente..');
        window.location.href = "../templates/registers_users.html";
        const user = userCredential.user;
        
    } catch (error) {
        alert('no sucessfull');
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`Error Code: ${errorCode}`);
        console.log(`Error Message: ${errorMessage}`);
    }
}

async function activation(){
    const userDetails = await register();
    await dates(userDetails);
}

window.addEventListener('DOMContentLoaded', async () => {
    guardar.addEventListener('click', activation);
});