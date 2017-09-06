/* global FIREBASE_API_KEY,
          FIREBASE_AUTH_DOMAIN,
          FIREBASE_DATABASE_URL,
          FIREBASE_PROJECT_ID,
          FIREBASE_STORAGE_BUCKET,
          FIREBASE_MESSEGING_SENDER_ID
*/
import firebase from 'firebase';
import {isExpired, isFinished} from '../libs/timer';
import {timerOptions} from 'config';
import {notifyMe} from '../workers/notification';
import {ifttTrigger, hipChatTrigger} from './integrations';

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

export const timerAction = ({startTime}) => dispatch => {
  const type = startTime ? 'RESET' : 'START';
  const wasStopped = Boolean(startTime);
  const newStartTime = startTime ? 0 : (new Date()).getTime();

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      database.ref(`users/${user.uid}`).update({
        type,
        startTime: newStartTime,
        wasStopped
      });
      database.ref(`users/${user.uid}`).once('value').then(snapshot => {
        const snapshotValue = snapshot.val();
        const {hipchatToken} = snapshotValue;
        if (type === 'START') {
          hipChatTrigger('xa', hipchatToken);
        }
        if (type === 'STOP') {
          hipChatTrigger('chat', hipchatToken);
        }
      });
    }
  });
  dispatch({type, startTime: newStartTime, wasStopped});
};

export const stopAction = options => dispatch => {
  const type = 'FINISH';
  const wasStopped = true;
  const {currentTimerLength, startTime} = options;

  if (isFinished({currentTimerLength, startTime})) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        database.ref(`users/${user.uid}`).update({
          type,
          // startTime, // TODO  const {startTime = 0} = snapshotValue;
          wasStopped
        });
        database.ref(`users/${user.uid}`).once('value').then(snapshot => {
          const snapshotValue = snapshot.val();
          const {hipchatToken} = snapshotValue;
          hipChatTrigger('chat', hipchatToken);
        });
      }
    });
    dispatch({type, startTime: 0, wasStopped});

    ifttTrigger();
    notifyMe();
  }
};

export const hipChatSaveToken = hipchatToken => dispatch => {
  const type = 'SAVE_HIPCHAT_TOKEN';

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      database.ref(`users/${user.uid}`).update({hipchatToken});
    }
  });
  dispatch({type, hipchatToken});
};

export const checkAuth = () => dispatch => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      database.ref(`users/${user.uid}`).once('value').then(snapshot => {
        const snapshotValue = snapshot.val();
        const {startTime = 0} = snapshotValue;

        dispatch(user ? { // TODO
          type: 'AUTHORIZED',
          name: user.displayName,
          photo: user.photoURL,
          hipchatToken: snapshotValue.hipchatToken,
          startTime: isExpired({currentTimerLength, startTime}) ? 0 : startTime
        } : {
          type: 'UNAUTHORIZED'
        });
      });
      // TODO
      // database.ref(`users/${user.uid}`).on('value', snapshot => {
        // const snapshotValue = snapshot.val();
        // const {startTime, wasStopped, type} = snapshotValue;

        // console.log('startTime, wasStopped', startTime, wasStopped, type);
        // if (type) { // TODO
          // dispatch({
          //   type,
          //   startTime: isExpired({time, startTime}) ? 0 : startTime,
          //   wasStopped
          // });
        // }
      // });
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
        startTime: isExpired({currentTimerLength, startTime}) ? 0 : startTime,
        name: user.displayName,
        photo: user.photoURL,
        hipchatToken: user.hipchatToken
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
