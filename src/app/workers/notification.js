import {notification} from '../../config';
const serviceWorker = window.navigator.serviceWorker;
const registerPromise = serviceWorker && serviceWorker.register('static/notification.worker.js');

export const notifyMe = () => {
  if (Notification) {
    Notification.requestPermission();
  } else {
    console.error('Desktop notifications not available in your browser.');
    return;
  }
  if (Notification.permission === 'granted') {
    const {options, title} = notification;
    if (registerPromise) {
      registerPromise.then(registration => {
        registration.showNotification(title, options);
      });
    } else {
      const notification = new Notification(title, options);
      notification.addEventListener('click', () => {
        console.log('this is actually clicked');
      });
    }
  } else {
    Notification.requestPermission();
  }
};

