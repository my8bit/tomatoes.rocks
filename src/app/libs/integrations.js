/* eslint quote-props: [2, "as-needed"] */
import {getEndOfTimerFormated} from './timer';
import {timerOptions} from 'config';

const {currentTimerLength} = timerOptions;

export const ifttTrigger = () => {
  const myHeaders = new Headers();
  const myInit = {
    method: 'POST',
    headers: myHeaders,
    mode: 'no-cors',
    cache: 'default'
  };
  const ifttSettings = JSON.parse(localStorage.getItem('settings'));
  if (!ifttSettings) {
    return;
  }
  const iftt = ifttSettings
    .filter(options => options.name && options.name.search('IFTT') !== -1)
    .map(setting => setting.value);
  const triggerName = iftt[0];
  const ifttKey = iftt[1];
  if (triggerName && ifttKey) {
    fetch(`https://maker.ifttt.com/trigger/${triggerName}/with/key/${ifttKey}`, myInit);
  }
};

export const hipChatTrigger = (status, startTime) => {
  const hipChatSettings = JSON.parse(localStorage.getItem('settings'));
  if (!hipChatSettings) {
    return;
  }
  const user = hipChatSettings
    .filter(options => options.name && options.name.search('HipChat') !== -1)
    .map(setting => setting.value);

  const token = user[0];
  const name = user[1];
  const email = user[2];
  const message = user[3];
  const joinedName = name.split(' ').join('');
  const mention_name = `${joinedName}`; // eslint-disable-line camelcase
  const urlEncodedName = encodeURIComponent(`@${mention_name}`); // eslint-disable-line camelcase
  const myHeaders = new Headers({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
  const whenTImerEnds = getEndOfTimerFormated({currentTimerLength, startTime});
  const statusMessage = (status === 'dnd') ?
    `${message} | My Pomodoro ends at ${whenTImerEnds}` : '';
  console.log(statusMessage);
  const myInit = {
    method: 'PUT',
    headers: myHeaders,
    cache: 'default',
    body: JSON.stringify({mention_name, name, presence: {show: status, status: statusMessage}, email}) // eslint-disable-line camelcase
  };
  if (token && name && email) {
    fetch(`https://api.hipchat.com/v2/user/${urlEncodedName}`, myInit);
  } else {
    console.warn('Check your HipChat credentials. Integration won\'t work untill you fix them', hipChatSettings);
  }
};
