/* global FIREBASE_API_KEY,
          FIREBASE_AUTH_DOMAIN,
          FIREBASE_DATABASE_URL,
          FIREBASE_PROJECT_ID,
          FIREBASE_STORAGE_BUCKET,
          FIREBASE_MESSEGING_SENDER_ID
*/
import firebase from 'firebase';

const apiKey = FIREBASE_API_KEY;
const authDomain = FIREBASE_AUTH_DOMAIN;
const databaseURL = FIREBASE_DATABASE_URL;
const projectId = FIREBASE_PROJECT_ID;
const storageBucket = FIREBASE_STORAGE_BUCKET;
const messagingSenderId = FIREBASE_MESSEGING_SENDER_ID;

firebase.initializeApp({
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId
});

const provider = new firebase.auth.TwitterAuthProvider();
const database = firebase.database();

window.writeKey = () => {
  const userId = firebase.auth().currentUser.uid;
  console.log(userId);
  database.ref(`users/${userId}`).set({
    foo: 'bar'
  });
};

window.readKey = () => {
  const userId = firebase.auth().currentUser.uid;
  return database.ref(`users/${userId}`).once('value').then(snapshot => {
    console.log(snapshot.val());
  });
};

// function writeUserData(userId, photoURL) {
//   firebase.database().ref(`users/${userId}`).set({
//     photo: photoURL
//   });
// }
// window.signInTwitter = () => {
//   firebase.auth().signInWithPopup(provider).then(result => {
//     // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
//     // You can use these server side with your app's credentials to access the Twitter API.
//     const token = result.credential.accessToken;
//     const secret = result.credential.secret;
//     // The signed-in user info.
//     const user = result.user;
//     console.log(token, secret, user);
//     writeUserData(user.uid, user.photoURL);
//   }).catch(error => {
//     // Handle Errors here.
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // The email of the user's account used.
//     const email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     const credential = error.credential;
//     console.log(errorCode, errorMessage, email, credential);
//   });
// };
// window.signOutTwitter = () => {
//   firebase.auth().signOut().then(() => {
//     // Sign-out successful.
//   }).catch(error => {
//     console.log(error);
//     // An error happened.
//   });
// };

export const logoutAction = () => dispatch => {
  firebase.auth().signOut().then(() => {
    dispatch({
      type: 'LOGOUT'
    });
  }).catch(error => {
    console.log(error);
    // An error happened.
  });
};

export const checkAuth = () => dispatch => {
  firebase.auth().onAuthStateChanged(user => {
    dispatch(user ? {type: 'AUTHORIZED', name: user.displayName, photo: user.photoURL} : {type: 'UNAUTHORIZED'});
  });
};

export const loginAction = () => dispatch => {
  firebase.auth().signInWithPopup(provider).then(result => {
    // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
    // You can use these server side with your app's credentials to access the Twitter API.
    const token = result.credential.accessToken;
    const secret = result.credential.secret;
    // The signed-in user info.
    const user = result.user;
    console.log(token, secret, user);
    console.log(user.photoURL);
    dispatch({
      type: 'LOGIN',
      name: user.name,
      photo: user.photoURL
    });
  }).catch(error => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    const credential = error.credential;
    console.log(errorCode, errorMessage, email, credential);
  });
};
