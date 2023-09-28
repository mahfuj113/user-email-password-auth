// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsU2OHv3jEMG0cTHVeTiypgpucybiXxMQ",
  authDomain: "user-email-password-auth-e6e4f.firebaseapp.com",
  projectId: "user-email-password-auth-e6e4f",
  storageBucket: "user-email-password-auth-e6e4f.appspot.com",
  messagingSenderId: "965341265487",
  appId: "1:965341265487:web:0fa1b455286e4515e6f43a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;