import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDVztpU6vOOHPVcqAIhOcuUlUuxn3DOjMo",
    authDomain: "reactjs-clothing.firebaseapp.com",
    databaseURL: "https://reactjs-clothing.firebaseio.com",
    projectId: "reactjs-clothing",
    storageBucket: "reactjs-clothing.appspot.com",
    messagingSenderId: "998417857781",
    appId: "1:998417857781:web:897a5022e1936c0b"
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;