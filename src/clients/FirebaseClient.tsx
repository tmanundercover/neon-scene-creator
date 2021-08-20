import firebase from "firebase/app";

// Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyCssaI_EJARlD7N_XfTHtsD1zqpe-Ua6NU',
  authDomain: 'scene-creators-83d41.firebaseapp.com',
  projectId: 'scene-creators-83d41',
  storageBucket: 'scene-creators-83d41.appspot.com',
  messagingSenderId: '797363232583',
  appId: '1:797363232583:web:f14cbe2cec198c96b7b662',
  measurementId: 'G-PLR4C6C6YN'
}

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)

export default {
  firebaseApp
}