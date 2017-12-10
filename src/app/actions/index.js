import {notifyMe} from '../workers/notification';
import {ifttTrigger} from '../libs/integrations';

export const changeAction = (value, id) => {
  const type = 'SETTING_CHANGED';
  return {type, value, id};
};

export const timerAction = time => {
  if (window.Notification) {
    window.Notification.requestPermission();
  }
  const type = time ? 'RESET' : 'START';
  const startTime = time ? 0 : (new Date()).getTime();
  return {type, startTime};
};

export const stopAction = () => {
  const type = 'FINISH';
  const startTime = 0;
  ifttTrigger();
  notifyMe();
  return {type, startTime};
};
