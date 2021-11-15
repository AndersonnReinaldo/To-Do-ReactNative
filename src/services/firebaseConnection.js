import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

let firebaseConfig = {
  apiKey: "AIzaSyA5gCkblfW7oHKnUr9DH3fcgdjze5fT8-Y",
  authDomain: "apptarefas-30a54.firebaseapp.com",
  projectId: "apptarefas-30a54",
  storageBucket: "apptarefas-30a54.appspot.com",
  messagingSenderId: "775612855414",
  appId: "1:775612855414:web:1b31f48059230160fe1b57"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}


export default firebase;