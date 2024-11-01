// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
//import '@react-native-firebase/database';
import 'firebase/compat/database';

const firebaseConfig = {
    apiKey: "AIzaSyB-8HJ0XPA8D39uNysIuwRDvm3ZoCy9V6U",
    authDomain: "appreact-8b27a.firebaseapp.com",
    databaseURL: "https://appreact-8b27a-default-rtdb.firebaseio.com",
    projectId: "appreact-8b27a",
    storageBucket: "appreact-8b27a.appspot.com",
    messagingSenderId: "329566334310",
    appId: "1:329566334310:web:5db3609299ae7600e2aca7",
    measurementId: "G-G2EXK8RCH5"
    };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;