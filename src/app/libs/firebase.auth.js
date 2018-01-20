/* global FIREBASE_API_KEY,
          FIREBASE_AUTH_DOMAIN,
          FIREBASE_DATABASE_URL,
          FIREBASE_PROJECT_ID,
          FIREBASE_STORAGE_BUCKET,
          FIREBASE_MESSEGING_SENDER_ID
*/
import firebase from 'firebase';
import {isExpired} from '../libs/timer';
import {settings, timerOptions} from 'config';

const {currentTimerLength} = timerOptions;
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

const twitterProvider = new firebase.auth.TwitterAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();
const database = firebase.database();
const providers = {
  twitter: twitterProvider,
  github: githubProvider
};

export {firebase, database};

export const logoutAction = () => dispatch => {
  firebase.auth().signOut().then(() => {
    dispatch({
      type: 'LOGOUT',
      settings: JSON.parse(localStorage.getItem('settings')) || settings
    });
  }).catch(error => {
    console.log(error);
    // An error happened.
  });
};

export const getSettings = () => {
  return new Promise(res => {
    const {currentUser: user} = firebase.auth();
    if (user) {
      database.ref(`users/${user.uid}`).once('value', snapshot => {
        res(snapshot.val() && snapshot.val().settings || settings);
      });
    } else {
      res(JSON.parse(localStorage.getItem('settings')) || settings);
    }
  });
};

export const setSettings = (settings, startTime) => {
  return new Promise(() => {
    const {currentUser: user} = firebase.auth();
    if (user) {
      database.ref(`users/${user.uid}`).update({
        settings,
        startTime
      });
    } else {
      localStorage.setItem('settings', JSON.stringify(settings));
    }
  });
};

export const checkAuth = () => dispatch => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      database.ref(`users/${user.uid}`).once('value', snapshot => {
        // For a new user snapshot.val() will be null
        const snapshotValue = snapshot.val() || {};
        const {startTime = 0, settings = []} = snapshotValue;
        console.log('settings from db', settings);
        dispatch({
          type: 'AUTHORIZED',
          name: user.displayName,
          photo: user.photoURL,
          settings: [].concat(settings),
          startTime: isExpired({currentTimerLength, startTime}) ? 0 : startTime
        });
      });
    } else {
      console.log('unsubscribe');
      dispatch({
        type: 'ANONYMOUS',
        settings: JSON.parse(localStorage.getItem('settings')) || [].concat(settings)
      });
    }
  });
};

export const loginAction = provider => dispatch => {// eslint-disable-line
  firebase.auth().signInWithPopup(providers[provider]).then(result => { // eslint-disable-line
    // provider.addScope(providers[provider]providerId);
    // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
    // You can use these server side with your app's credentials to access the Twitter API.
    // const token = result.credential.accessToken;
    // const secret = result.credential.secret;
    // The signed-in user info.
    // const user = result.user;
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
