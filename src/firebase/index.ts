import firebase from "firebase/compat/app";
import "firebase/compat/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBO4QfWSBlpE3-67n0Dl0DBcHXkpCUvhg0",
    authDomain: "rememberme-13d98.firebaseapp.com",
    projectId: "rememberme-13d98",
    storageBucket: "rememberme-13d98.appspot.com",
    messagingSenderId: "279988543521",
    appId: "1:279988543521:web:143fc156203177c0a24360",
    measurementId: "G-9PVTD9YSJK"
  };

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
export default auth;