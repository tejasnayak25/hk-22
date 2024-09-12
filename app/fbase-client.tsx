// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIQKNaRwnsxlCSZBACO1K7QRwSRlRjFwE",
  authDomain: "varnotsava-405511.firebaseapp.com",
  projectId: "varnotsava-405511",
  storageBucket: "varnotsava-405511.appspot.com",
  messagingSenderId: "808606184188",
  appId: "1:808606184188:web:b0e51856474ba07f701d79",
  measurementId: "G-WB3VPNT4EK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const _auth = getAuth();

function _loginRequired(router: any) {
    _auth.onAuthStateChanged((user) => {
        if(!user) {
            router.push("/login");
        }
    });
}

export const auth = _auth;
export const loginRequired = _loginRequired;