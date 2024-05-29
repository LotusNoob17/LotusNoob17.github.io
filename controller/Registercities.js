import{Setregister,  Getregister} from '../Controllers/firebase.js'

const save = document.getElementById('btnsave')
const search = document.getElementById('btnsearch')
const imprimir =  document.getElementById('cont')

async function guardar() {
    const cod = document.getElementById('edtcod').value;
    const nombre = document.getElementById('edtname').value;
    const país = document.getElementById('edtpais').value;

    try {
        await Setregister(cod, nombre, país);
        alert('Registro exitoso');
        window.location.href = 'Registercities.html';
    } catch (e) {
        console.error('Error al agregar el documento:', e);
        alert('Registro fallido');
    }
}
async function Ver() {
    const cod = document.getElementById('edtcod').value;

    try {
        const docSnap = await Getregister(cod);

        if (docSnap.exists()) {
            console.log("Datos del documento:", docSnap.data());
            let Html = `
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${docSnap.data().name}</h5>
                        <p class="card-text">${docSnap.data().codigo}</p>
                        <p class="card-text">${docSnap.data().country}</p>
                        <a href="#" class="btn btn-primary">Eliminar</a>
                        <a href="#" class="btn btn-primary">Actualizar</a>
                    </div>
                </div>
            `;
            imprimir.innerHTML = Html;
        } else {
            console.log("No existe dicho documento.");
        }
    } catch (error) {
        console.error('Error al obtener el documento:', error);
    }
}

window.addEventListener('DOMContentLoaded', async () => {
    save.addEventListener('click', guardar);
    search.addEventListener('click', Ver);
});