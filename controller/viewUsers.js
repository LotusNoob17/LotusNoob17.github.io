import { viewdata, eliminarUsuarios, Addregister } from "../controller/firebase.js";
import {register} from "../controller/register_user.js";


const ver =  document.getElementById('vdata');
const agregarbtn = document.getElementById('agregarbtn');
const registerForm = document.getElementById('registerForm');
const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));

async function dates(userDetails){
    const {identi, Nombre, Rol, Direccion, Telefono, RH, Genero, email} = userDetails; // Extrae los detalles del usuario
    try {
        const validar = await Addregister(identi, Nombre, Rol, Direccion, Telefono, RH, Genero, email);
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

agregarbtn.addEventListener('click', () => {
    // Abre el modal con el formulario de registro
    registerModal.show();
});


registerForm.addEventListener('submit', async (event) => {
    // Evita que el formulario se envíe normalmente
    event.preventDefault();

    // Llama a tus funciones register y dates
    const userDetails = await register();
    await dates(userDetails);
});

async function eliminarUsuario(docId) {
        try {
            // Elimina el documento de Firestore
            await eliminarUsuarios(docId);

            // Recarga los datos de la tabla
            cargar();
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
    
}

window.eliminarUsuario = eliminarUsuario;

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
            <td><button onclick="eliminarUsuario('${doc.id}')">Eliminar</button></td>
            </tr>
        `
    });
}

window.addEventListener('DOMContentLoaded', async()=>{
    cargar()
})

