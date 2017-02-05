import moment from 'moment';
import 'moment-duration-format';

export const getTimer = (time, startTime) => {
  return time - (startTime ? (new Date()).getTime() - startTime : 0);
};

export const formatDate = (time, startTime) => {
  return moment.duration(getTimer(time, startTime), 'ms').format('mm:ss');
};

let fnArray = [];

setInterval(fnArray.forEach(fn => fn()), 1000);

export const addFn = fn => fnArray.push(fn);
export const removeFn = fn => {
  fnArray = fnArray.filter(arrFn => arrFn !== fn);
};

window.addFn = addFn;
window.removeFn = removeFn;
