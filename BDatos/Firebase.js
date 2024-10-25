import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';




const settings = {timestampsInSnapshots: true,merge:true};
const config = {
  apiKey: "AIzaSyB-8HJ0XPA8D39uNysIuwRDvm3ZoCy9V6U",
  authDomain: "appreact-8b27a.firebaseapp.com",
  databaseURL: "https://appreact-8b27a-default-rtdb.firebaseio.com",
  projectId: "appreact-8b27a",
  storageBucket: "appreact-8b27a.appspot.com",
  messagingSenderId: "329566334310",
  appId: "1:329566334310:web:5db3609299ae7600e2aca7",
  measurementId: "G-G2EXK8RCH5"
};
firebase.initializeApp(config);

firebase.firestore().settings(settings);
const storage=firebase.storage;


export default conexion = firebase.firestore()
const auth = firebase.auth() 
const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export {
    firebase,
    auth,
   googleAuthProvider,
  storage,
}