import { viewdata, eliminarDatosUsuario } from "../controller/firebase.js";

async function eliminarUsuario(docId) {
    // Pide confirmación al usuario antes de eliminar
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario? Esta acción es irreversible.')) {
        try {
            // Elimina el documento de Firestore
            await eliminarDatosUsuario(docId);

            // Recarga los datos de la tabla
            cargar();
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
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
            <td><button onclick="eliminarUsuario('${doc.id}')">Eliminar</button></td>
            </tr>
        `
    });
}

window.addEventListener('DOMContentLoaded', async()=>{
    cargar()
})