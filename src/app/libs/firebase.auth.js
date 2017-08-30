/* global FIREBASE_API_KEY,
          FIREBASE_AUTH_DOMAIN,
          FIREBASE_DATABASE_URL,
          FIREBASE_PROJECT_ID,
          FIREBASE_STORAGE_BUCKET,
          FIREBASE_MESSEGING_SENDER_ID
*/
import firebase from 'firebase';
import {isExpired} from '../libs/timer';
import {timerOptions} from 'config';

const {time} = timerOptions;
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

export const timerAction = time => dispatch => {
  const type = time ? 'RESET' : 'START';
  const wasStopped = Boolean(time);
  const startTime = time ? 0 : (new Date()).getTime();

  // localStorage.setItem('startTime', startTime);
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      database.ref(`users/${user.uid}`).set({
        type,
        startTime,
        wasStopped
      });
    }
  });
  dispatch({type, startTime, wasStopped});
};

export const stopAction = () => dispatch => {
  const type = 'STOP';
  const wasStopped = true;
  const startTime = 0;

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      database.ref(`users/${user.uid}`).set({
        startTime,
        wasStopped
      });
    }
  });
  dispatch({type, wasStopped});
};

export const checkAuth = () => dispatch => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      database.ref(`users/${user.uid}`).once('value').then(snapshot => {
        const snapshotValue = snapshot.val();
        const {startTime, wasStopped} = snapshotValue;

        dispatch(user ? { // TODO
          type: 'AUTHORIZED',
          name: user.displayName,
          photo: user.photoURL,
          startTime: isExpired({time, startTime}) ? 0 : startTime,
          wasStopped
        } : {
          type: 'UNAUTHORIZED'
        });
      });
      // TODO
      database.ref(`users/${user.uid}`).on('value', snapshot => {
        const snapshotValue = snapshot.val();
        const {startTime, wasStopped, type} = snapshotValue;

        // console.log('startTime, wasStopped', startTime, wasStopped, type);
        if (type) { // TODO
          dispatch({type, startTime, wasStopped});
        }
      });
    }
  });
};

export const loginAction = () => dispatch => {
  firebase.auth().signInWithPopup(provider).then(result => {
    // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
    // You can use these server side with your app's credentials to access the Twitter API.
    // const token = result.credential.accessToken;
    // const secret = result.credential.secret;
    // The signed-in user info.
    const user = result.user;

    database.ref(`users/${user.uid}`).once('value').then(snapshot => {
      const startTime = snapshot.val().startTime;
      dispatch({
        type: 'AUTHORIZED',
        startTime,
        name: user.displayName,
        photo: user.photoURL
      });
    });
  })
  .catch(error => {
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
