import {notification} from 'config';

const serviceWorker = window.navigator && window.navigator.serviceWorker;
const registerPromise = serviceWorker && serviceWorker.register('static/notification.worker.js');

export const notifyMe = () => {
  if (window.Notification && window.Notification.permission === 'granted') {
    const {options, title} = notification;
    if (registerPromise) {
      registerPromise.then(registration => {
        registration.showNotification(title, options);
        serviceWorkerRequest(registration, 'h1');
      });
    } else {
      const browserNotification = new window.Notification(title, options);
      browserNotification.addEventListener('click', () => {
        console.log('this is actually clicked');
      });
    }
  } else {
    console.error('Desktop notifications not available in your browser.');
  }
};

function serviceWorkerRequest(wrkr, message) {
  if ('serviceWorker' in window.navigator) {
    if (!wrkr) {
      return Promise.reject('No service worker controller.');
    }
    return new Promise((resolve, reject) => {
      const messageChannel = new MessageChannel();
      messageChannel.port1.onmessage = event => {
        if (event.data.error) {
          reject(event.data.error);
        } else {
          resolve(event.data);
        }
      };
      wrkr.active.postMessage(message, [messageChannel.port2]);
    });
  }
}
