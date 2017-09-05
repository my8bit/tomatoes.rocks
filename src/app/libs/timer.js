import moment from 'moment';
import 'moment-duration-format';
import {timerOptions} from 'config';

const {interval} = timerOptions;

export const getRemainingTime = ({currentTimerLength, startTime}) => {
  return currentTimerLength - (startTime ? (new Date()).getTime() - startTime : 0);
};

export const isExpired = ({currentTimerLength, startTime}) => {
  return getRemainingTime({currentTimerLength, startTime}) < 0;
};

export const isFinished = ({currentTimerLength, startTime}) => {
  return isExpired({currentTimerLength, startTime}) && startTime !== 0;
};

export const formatTime = ({currentTimerLength, startTime}) => {
  return moment.duration(getRemainingTime({currentTimerLength, startTime}), 'ms')
               .format('mm:ss', {trim: false});
};

let functions = [];

setInterval(() => {
  functions.forEach(fn => fn());
}, interval || 1000);

export const startUpdate = fn => functions.push(fn);

export const stopUpdate = fn => {
  functions = functions.filter(fns => fns !== fn);
};
