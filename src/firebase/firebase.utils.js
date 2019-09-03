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
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const addCollectionAndDocument = async (collectionKey, collectionArray) => {
  const collection = firestore.collection(collectionKey);
  const batch = firestore.batch();


  for (var key of Object.keys(collectionArray)) {
    const docReference = collection.doc();
    const { title, items } = collectionArray[key];
    batch.set(docReference, { title, items });
  }

  return await batch.commit();
}

export const convertCollectionsToMap = (collection) => {

  const transformedCollection = collection.docs.map(doc => {
    const { title, items } = doc.data();
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});

}

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
