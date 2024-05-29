import { viewdata, eliminarUsuario, Addregister, obtenerPasswordUsuario, Getregister, registerauth, enviar } from "../controller/firebase.js";


// Declaraciones de variables
const ver =  document.getElementById('vdata');
const agregarbtn = document.getElementById('agregarbtn');
const registerForm = document.getElementById('registerForm');
const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
const editForm = document.getElementById('editForm')
const editModal = new bootstrap.Modal(document.getElementById('editModal'));
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');
let currentIdenti;


// Definiciones de funciones
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

        alert('Registro exitoso. correo electrónico enviado a la cuenta registrada.');
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
        window.location.href = "../templates/viewUsers.html";
        const user = userCredential.user;
        
    } catch (error) {
        alert('no sucessfull');
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(`Error Code: ${errorCode}`);
        console.log(`Error Message: ${errorMessage}`);
    }
}

async function edit(identi) {
    currentIdenti = identi; // Almacena el identi cuando se edita un usuario
    console
    const docSnap = await Getregister(identi);
    if (docSnap.exists()) {
        // Rellena los campos del formulario con los datos actuales del usuario
        document.getElementById('name1').value = docSnap.data().Nombre;
        document.getElementById('Rol1').value = docSnap.data().Rol;
        document.getElementById('adress1').value = docSnap.data().Direccion;
        document.getElementById('phone1').value = docSnap.data().Telefono;
        document.getElementById('blood1').value = docSnap.data().RH;
        document.getElementById('Gene1').value = docSnap.data().Genero;
        document.getElementById('email1').value = docSnap.data().email;
        document.getElementById('password1').value = docSnap.data().password;
        // Abre el modal con el formulario
        editModal.show();
        // Devuelve los datos del usuario
    } else {
        console.log("No existe dicho documento.");
    }
}

async function eliminarUsuarios(email) {
    try {
        const password = await obtenerPasswordUsuario(email);
        await eliminarUsuario(email, password);

        cargar();
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
    }

}

async function cargar(){
    ver.innerHTML=''
    const docref = viewdata()
    const querySnapshot = await docref
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id}`);
        ver.innerHTML+=`
            <tr>
            <th scope="row">${doc.data().identi}</th>
            <td>${doc.data().Nombre}</td>
            <td>${doc.data().Rol}</td>
            <td>${doc.data().Direccion}</td>
            <td>${doc.data().Telefono}</td>
            <td>${doc.data().RH}</td>
            <td>${doc.data().Genero}</td>
            <td>${doc.data().email}</td>
            <td><button onclick="eliminarUsuarios('${doc.data().email}')">Eliminar</button></td>
            <td><button onclick="edit('${doc.data().identi}')">Editar</button></td>
            </tr>
        `
    });
}


// Asignaciones globales
window.edit = edit;
window.eliminarUsuarios = eliminarUsuarios;


// Event listeners
searchBtn.addEventListener('click', async () => {
    const identi = searchInput.value;
    const docSnap = await Getregister(identi);

    if (docSnap.exists()) {
        console.log("Datos del documento:", docSnap.data());
        ver.innerHTML = `
            <tr>
            <th scope="row">${docSnap.data().identi}</th>
            <td>${docSnap.data().Nombre}</td>
            <td>${docSnap.data().Rol}</td>
            <td>${docSnap.data().Direccion}</td>
            <td>${docSnap.data().Telefono}</td>
            <td>${docSnap.data().RH}</td>
            <td>${docSnap.data().Genero}</td>
            <td>${docSnap.data().email}</td>
            <td><button onclick="eliminarUsuarios('${docSnap.data().email}')">Eliminar</button></td>
            </tr>
        `;
    } else {
        console.log("No existe dicho documento.");
    }
});

agregarbtn.addEventListener('click', () => {
    registerModal.show();
});

editForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const Nombre = document.getElementById('name1').value;
    const Rol = document.getElementById('Rol1').value;
    const Direccion = document.getElementById('adress1').value;
    const Telefono = document.getElementById('phone1').value;
    const RH = document.getElementById('blood1').value;
    const Genero = document.getElementById('Gene1').value;
    const Email = document.getElementById('email1').value;
    const Password = document.getElementById('password1').value;
    await Addregister(currentIdenti, Nombre, Rol, Direccion, Telefono, RH, Genero, Email, Password);
    alert('Los datos se enviaron exitosamente..');
        window.location.href = "../templates/viewUsers.html";
});
registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const userDetails = await register();
    await dates(userDetails);
});

window.addEventListener('DOMContentLoaded', async()=>{
    cargar()
})

