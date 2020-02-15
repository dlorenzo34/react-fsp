import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/auth';

// Replace this with your own config details
var config = {
  apiKey: "AIzaSyCi0MiQ7eh_UZi34bnagSCG7qDdUXstWm0",
  authDomain: "notes-e-school.firebaseapp.com",
  databaseURL: "https://notes-e-school.firebaseio.com",
  projectId: "notes-e-school",
  storageBucket: "notes-e-school.appspot.com",
  messagingSenderId: "8610176078",
  appId: "1:8610176078:web:59ffbbd3298f36f0f5771f",
  measurementId: "G-V6NCDNCX47"
};
firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });

const storage = firebase.storage();

export {
  storage, firebase as default
}