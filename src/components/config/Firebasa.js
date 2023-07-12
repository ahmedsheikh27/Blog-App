// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-rDpWJChgC84p_EjSTrVI2QssiojQsok",
  authDomain: "blog-app-747b7.firebaseapp.com",
  projectId: "blog-app-747b7",
  storageBucket: "blog-app-747b7.appspot.com",
  messagingSenderId: "810019941990",
  appId: "1:810019941990:web:c8e0bd4c496218c17c87a7",
  measurementId: "G-CJTPBG38NX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
// const user = auth.currentUser;
export {analytics, auth, app}