// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";
import { getApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmXAufrPxsq__E6Ny8AgR1Pzqh6k_nzOw",
  authDomain: "blog-app-9bd8b.firebaseapp.com",
  projectId: "blog-app-9bd8b",
  storageBucket: "blog-app-9bd8b.appspot.com",
  messagingSenderId: "820575477785",
  appId: "1:820575477785:web:d8267c39992caddb870a88",
  measurementId: "G-B948F2KNCL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);  
const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app)
const firebaseapp = getApp()
const storage = getStorage(firebaseapp, "gs://blog-app-9bd8b.appspot.com")
const provider = new GoogleAuthProvider();
// const user = auth.currentUser;
export {analytics, auth, app, firestore, storage, provider}