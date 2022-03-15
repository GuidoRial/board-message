import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

firebase.initializeApp({
    apiKey: "AIzaSyA-pjqRigcQ-fWJbYGEXBJzubkY6q3wY4w",
    authDomain: "message-board-83402.firebaseapp.com",
    projectId: "message-board-83402",
    storageBucket: "message-board-83402.appspot.com",
    messagingSenderId: "1002777481243",
    appId: "1:1002777481243:web:d8579071c992634420a8be",
});

const auth = getAuth();
const authService = firebase.auth();
const firestore = firebase.firestore();
const storage = getStorage();

export { auth, authService, firestore, storage, firebase };
