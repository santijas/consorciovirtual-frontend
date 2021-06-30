import firebase from 'firebase/app'
import "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyA20aCf4sYdBn5e9cRmkFm1AjZffjhjkwY",
    authDomain: "consorciovirtual.firebaseapp.com",
    projectId: "consorciovirtual",
    storageBucket: "consorciovirtual.appspot.com",
    messagingSenderId: "601974944992",
    appId: "1:601974944992:web:fc83c94784ef49ef348c85",
    measurementId: "G-MMVN8440K2"
  };
  // Initialize Firebase
  export const app = firebase.initializeApp(firebaseConfig);
