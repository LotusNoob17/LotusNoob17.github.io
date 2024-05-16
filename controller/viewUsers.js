import{viewdata} from "../controller/firebase.js"

const ver =  document.getElementById('vdata')

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
            </tr>
        `
    });
}

window.addEventListener('DOMContentLoaded', async()=>{
    cargar()
})