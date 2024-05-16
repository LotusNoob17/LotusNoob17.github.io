import { userstate, loginout } from '../controller/firebase.js'

userstate()

const sesion = document.getElementById('btnlogout')

async function cerrarsesion(){
    const verficacion = loginout()
    const comprobar = await verficacion
    .then((comprobar)=>{
        alert('Sesion cerrada')
        window.location.href= "../index.html"
    })
    .catch((error)=>{
        alert('Sesion no iniciada')
    })
}
window.addEventListener('DOMContentLoaded',async()=>{
    sesion.addEventListener('click',cerrarsesion)
})   
