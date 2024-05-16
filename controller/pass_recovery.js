import { resetpassword } from "../controller/firebase.js";

const recover = document.getElementById('recoverybtn');

async function resetear() {
  console.log('Función resetear llamada');
  const email = document.getElementById('username').value;

  if (email.trim() === '') {
      console.log('Correo electrónico vacío');
      alert("Por favor, ingresa tu correo electrónico.");
      return; 
  }

  console.log('Llamada a resetpassword con correo electrónico:', email);
  try {
      const validation = await resetpassword(email);
      console.log('Correo de restablecimiento enviado exitosamente a:', email);
      alert("Reset Sucessfully: " + email);
      window.location.href = "../index.html";
  } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error('Error al enviar el correo de restablecimiento:', errorCode, errorMessage);
  }
}


window.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM cargado');
    recover.addEventListener('click', resetear);
    console.log('Controlador de eventos añadido al botón');
});


