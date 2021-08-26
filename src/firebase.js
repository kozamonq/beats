import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import React from 'react';

const firebaseConfig = {
  apiKey: 'AIzaSyAXlv4P9dXdScc5g4U0ztptGSCuOSlmasc',
  authDomain: 'beats-auth-development.firebaseapp.com',
  databaseURL: 'https://beats-auth-development-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'beats-auth-development',
  storageBucket: 'beats-auth-development.appspot.com',
  messagingSenderId: '905062192007',
  appId: '1:905062192007:web:a950abcda839f8f4f97922',
};
////

/* export const firebaseConfig = firebase.initializeApp({
  apiKey: 'AIzaSyAXlv4P9dXdScc5g4U0ztptGSCuOSlmasc',
  authDomain: 'beats-auth-development.firebaseapp.com',
  databaseURL: 'https://beats-auth-development-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'beats-auth-development',
  storageBucket: 'beats-auth-development.appspot.com',
  messagingSenderId: '905062192007',
  appId: '1:905062192007:web:a950abcda839f8f4f97922',
});
/// */


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const db = firebase.firestore();



export const createUserDocument = async (user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`users/${user.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { email } = user;
    const { displayName } = additionalData;

    try {
      await userRef.set({
        displayName,
        email,
        createdAt: new Date(),
        verificado: null,
        avatar: null,
        usuario: user.uid,
        beatmaker: "no",
        terminosConfirmados:"no"
      });
    } catch (error) {
      console.log('Error in creating user', error);
    }
  }
};

export default firebase;











/* class Lectura extends React.Component {
  state = {
    users: null
  }

  componentDidMount(){
    console.log('mounted')
  }



}
export default Lectura

 */