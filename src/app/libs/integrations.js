/* global IFTT_KEY,
          TRIGGER_NAME
*/
/* eslint quote-props: [2, "as-needed"] */

export const ifttTrigger = () => {
  const myHeaders = new Headers();
  const myInit = {
    method: 'POST',
    headers: myHeaders,
    mode: 'no-cors',
    cache: 'default'
  };
  const ifttKey = IFTT_KEY || window.iftt;
  const triggerName = TRIGGER_NAME || window.triggerName;
  if (triggerName && ifttKey) {
    fetch(`https://maker.ifttt.com/trigger/${triggerName}/with/key/${ifttKey}`, myInit);
  }
};

export const hipChatTrigger = (status, hipchatToken) => {
  const user = hipchatToken.split(',');
  const token = user[0];
  const name = user[1];
  const email = user[2];
  const joinedName = name.split(' ').join('');
  const mention_name = `${joinedName}`; // eslint-disable-line camelcase
  const urlEncodedName = encodeURIComponent(`@${mention_name}`); // eslint-disable-line camelcase
  const myHeaders = new Headers({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
  const myInit = {
    method: 'PUT',
    headers: myHeaders,
    cache: 'default',
    body: JSON.stringify({mention_name, name, presence: {show: status}, email}) // eslint-disable-line camelcase
  };
  if (token && name && email) {
    fetch(`https://api.hipchat.com/v2/user/${urlEncodedName}`, myInit);
  } else {
    console.warn('Check your HipChat credentials. Integratio won\'t work untill you fix them', user);
  }
};
