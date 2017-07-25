import moment from 'moment';
import 'moment-duration-format';
import {timerOptions} from 'config';

const {interval} = timerOptions;

export const getTimer = (time, startTime) => {
  return time - (startTime ? (new Date()).getTime() - startTime : 0);
};

export const formatDate = (time, startTime) => {
  return moment.duration(getTimer(time, startTime), 'ms').format('mm:ss', {trim: false});
};

let fnArray = [];

setInterval(() => {
  fnArray.forEach(fn => {
    fn();
  });
}, interval || 1000);

export const addToInterval = fn => fnArray.push(fn);
export const removeFromInterval = fn => {
  fnArray = fnArray.filter(arrFn => arrFn !== fn);
};
