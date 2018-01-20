import {notifyMe} from '../workers/notification';
import {ifttTrigger, hipChatTrigger} from '../libs/integrations';

export const changeAction = (value, id) => {
  const type = 'SETTING_CHANGED';
  return {type, value, id};
};

export const timerAction = time => {
  const startTime = time ? 0 : (new Date()).getTime();
  if (window.Notification) {
    window.Notification.requestPermission();
  }
  const type = time ? 'RESET' : 'START';
  if (type === 'START') {
    hipChatTrigger('dnd', startTime);
  }
  if (type === 'RESET') {
    hipChatTrigger('chat', startTime);
  }
  return {type, startTime};
};

export const stopAction = () => {
  const type = 'FINISH';
  const startTime = 0;
  ifttTrigger();
  hipChatTrigger('chat', startTime);
  notifyMe();
  return {type, startTime};
};
