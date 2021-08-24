import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyC4dg9YHOD9AEsh3HNVpfTDJTzqRVkzVAM",
    authDomain: "snapchat-clone-3232e.firebaseapp.com",
    projectId: "snapchat-clone-3232e",
    storageBucket: "snapchat-clone-3232e.appspot.com",
    messagingSenderId: "314250241364",
    appId: "1:314250241364:web:f6c9d64b36903ba39314c1"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, storage, provider };
