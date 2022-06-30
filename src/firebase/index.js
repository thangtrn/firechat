import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA_Epo2xFx9RafnwCj5K9VcaHpS4cARAYM",
    authDomain: "fire-chat-3e847.firebaseapp.com",
    projectId: "fire-chat-3e847",
    storageBucket: "fire-chat-3e847.appspot.com",
    messagingSenderId: "224403528380",
    appId: "1:224403528380:web:926a3d38632be423f0ceb9"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)
export const db = getFirestore(app)
