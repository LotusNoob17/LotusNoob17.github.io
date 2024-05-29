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
    updateDoc,
    query,
    where,
    getDocs,
    getDoc,
    doc,
    setDoc,
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

// Método para registrar cuentas con correo electrónico y contraseña
export const registerauth = (email, password) => createUserWithEmailAndPassword(auth, email, password);
export const resetpassword = (email) => sendPasswordResetEmail(auth, email);

//Métodos database con firestore

export const Addregister = async (identi, Nombre, Rol, Direccion, Telefono, RH, Genero, email, password) => {
    try {
        await setDoc(doc(db, "users", identi), {
            identi: identi,
            Nombre: Nombre,
            Rol: Rol, 
            Direccion: Direccion,
            Telefono: Telefono,
            RH: RH,
            Genero: Genero,
            email: email,
            password: password
        });
        console.log("Documento registrado con ID: ", identi);
    } catch (error) {
        console.error("Error al agregar el documento: ", error);
    }
};


//Leer registro especifico
export const Getregister=(identi)=> 
    getDoc(doc(db, "users", identi))


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

export async function obtenerPasswordUsuario(email) {
    try {
        const q = query(collection(db, 'users'), where('email', '==', email));
        const querySnapshot = await getDocs(q);
        let userPassword;
        querySnapshot.forEach((doc) => {
            userPassword = doc.data().password;
        });
        return userPassword;
    } catch (error) {
        console.error('Error al obtener la contraseña del usuario:', error);
        return null;
    }
}

export async function eliminarUsuario(email, password) {
    // Obtén los datos del usuario de Firestore

    await signInWithEmailAndPassword(auth, email, password);
    const userSnapshot = await obtenerCorreosUsuarios(email);

    if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];

        // Pide confirmación al usuario antes de eliminar
        if (window.confirm('¿Estás seguro de que quieres eliminar este usuario? Esta acción es irreversible.')) {
            try {
                // Elimina los datos del usuario en Firestore
                await deleteDoc(doc(db, 'users', userDoc.id));

                // Comprueba si el usuario actual es el usuario que se va a eliminar
                if (auth.currentUser.email === email) {
                    // Elimina la cuenta del usuario
                    await deleteUser(auth.currentUser);
                }

                console.log('Usuario eliminado correctamente');
            } catch (error) {
                console.error('Error al eliminar el usuario:', error);
            }
        }
    } else {
        console.log('No se encontró el usuario');
    }
}

export async function eliminarusuarioProvider(email) {
    const auth = getAuth();
    // Comprueba si el usuario ha iniciado sesión
    const userSnapshot = await obtenerCorreosUsuarios(email);

    if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];

        // Pide confirmación al usuario antes de eliminar
        if (window.confirm('¿Estás seguro de que quieres eliminar este usuario? Esta acción es irreversible.')) {
            try {
                // Elimina los datos del usuario en Firestore
                await deleteDoc(doc(db, 'users', userDoc.id));

                // Comprueba si el usuario actual es el usuario que se va a eliminar
                if (auth.currentUser.email === email) {
                    // Elimina la cuenta del usuario
                    await deleteUser(auth.currentUser);
                }

                console.log('Usuario eliminado correctamente');
            } catch (error) {
                console.error('Error al eliminar el usuario:', error);
            }
        }
    } else {
        console.log('No se encontró el usuario');
    }
}




 




