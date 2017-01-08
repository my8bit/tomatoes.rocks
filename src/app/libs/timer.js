import moment from 'moment';
import 'moment-duration-format';

export const getTimer = (time, startTime) => {
  return time - (startTime ? (new Date()).getTime() - startTime : 0);
};

export const formatDate = (time, startTime) => {
  return moment.duration(getTimer(time, startTime), 'ms').format('mm:ss');
};
