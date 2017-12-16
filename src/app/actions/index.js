import {notifyMe} from '../workers/notification';
import {ifttTrigger, hipChatTrigger} from '../libs/integrations';

export const changeAction = (value, id) => {
  const type = 'SETTING_CHANGED';
  console.log(value, id);
  return {type, value, id};
};

export const timerAction = time => {
  if (window.Notification) {
    window.Notification.requestPermission();
  }
  const type = time ? 'RESET' : 'START';
  if (type === 'START') {
    hipChatTrigger('dnd');
  }
  if (type === 'RESET') {
    hipChatTrigger('chat');
  }
  const startTime = time ? 0 : (new Date()).getTime();
  return {type, startTime};
};

export const stopAction = () => {
  const type = 'FINISH';
  const startTime = 0;
  ifttTrigger();
  hipChatTrigger('chat');
  notifyMe();
  return {type, startTime};
};
