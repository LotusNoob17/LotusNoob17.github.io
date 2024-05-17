import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js';
import { 
    getAuth, 
    signInWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    sendEmailVerification,
    sendPasswordResetEmail,
    FacebookAuthProvider,
    deleteUser
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js';

import { 
    getFirestore,
    collection,
    addDoc,
    query,
    where,
    getDocs,
    doc,
    deleteDoc
} from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js';


const firebaseConfig = {
    apiKey: "AIzaSyA3qdhD7m036I1n2FGJZaPOWgoSduuG500",
    authDomain: "jdrpapiweb2024a.firebaseapp.com",
    projectId: "jdrpapiweb2024a",
    storageBucket: "jdrpapiweb2024a.appspot.com",
    messagingSenderId: "932900446513",
    appId: "1:932900446513:web:85f69f23c48bb5204ad010",
    measurementId: "G-VJP5DQKK51"
  };

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const db = getFirestore(app);
export { doc, deleteDoc };
//Nuevas instancias
export const provider = new GoogleAuthProvider();
export const providerf = new FacebookAuthProvider();


//Método para enviar un mensaje de verificación
export const enviar = () => sendEmailVerification(auth.currentUser);

//Métodos de autenticación 
export const loginpopupfacebook = () => signInWithPopup(auth, providerf);
export const loginpopupgoogle = () => signInWithPopup(auth, provider);
export const loginauth = (email, password) => signInWithEmailAndPassword(auth, email, password);

// Método para cerrar sesión
export const loginout = () => signOut(auth);

// Función para verificar el estado del usuario
export function userstate() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            console.log(uid);
        } else {
            window.location.href = "../index.html";
        }
    });
}

// Función para eliminar el usuario
export function EliminarUsuario(auth) {
    console.log('Función EliminarUsuario llamada');
    const user = auth.currentUser;
    deleteUser(user).then(() => {
        console.log('Usuario eliminado');
    }).catch((error) => {
        console.error('Error al eliminar el usuario', error);
    });
}


// Método para registrar cuentas con correo electrónico y contraseña
export const registerauth = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const resetpassword = (email) => sendPasswordResetEmail(auth, email);

//Métodos database con firestore

//datos register
export const Addregister = async (identi, Nombre, Rol, Direccion, Telefono, RH, Genero, email) => {
    try {
        const docRef = await addDoc(collection(db, "users"), {
            identi: identi,
            Nombre: Nombre,
            Rol: Rol, 
            Direccion: Direccion,
            Telefono: Telefono,
            RH: RH,
            Genero: Genero,
            email: email
        });
        console.log("Documento registrado con ID: ", docRef.id);
    } catch (error) {
        console.error("Error al agregar el documento: ", error);
    }
};

export const viewdata=()=>
    getDocs(collection(db, "users"));

export async function obtenerCorreosUsuarios(email) {
    try {
        const q = query(collection(db, 'users'), where('email', '==', email));
        const querySnapshot = await getDocs(q);
        return querySnapshot;
    } catch (error) {
        console.error('Error al obtener los correos electrónicos de los usuarios:', error);
        return null;
    }
}

export async function eliminarDatosUsuario(email) {
    // Obtén los datos del usuario de Firestore

    const userSnapshot = await obtenerCorreosUsuarios(email);

    if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];

        // Elimina los datos del usuario en Firestore
        await deleteDoc(doc(db, 'users', userDoc.id));

        // Obtiene la autenticación del usuario
        const auth = getAuth();

        // Comprueba si el usuario actual es el usuario que se va a eliminar
        if (auth.currentUser.email === email) {
            // Elimina la cuenta del usuario
            await deleteUser(auth.currentUser);
        }
    }
}

export async function eliminarUsuarios(docId) {
    // Pide confirmación al usuario antes de eliminar
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario? Esta acción es irreversible.')) {
        try {
            // Elimina el documento de Firestore
            await deleteDoc(doc(db, 'users', docId));
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
        }
    }
}


 




