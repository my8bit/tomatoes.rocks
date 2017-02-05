/* global clients */
const messageToAll = msg => {
  self.clients.matchAll().then(allClients => {
    allClients.forEach(client => {
      messageToClient(client, msg).then(m => console.log("SW Received Message: "+m));
    });
  });
};

function messageToClient(client, msg) {
  return new Promise((resolve, reject) => {
    const msgChannel = new MessageChannel();
    msgChannel.port1.onmessage = event => {
      if (event.data.error) {
        reject(event.data.error);
      } else {
        resolve(event.data);
      }
    };

    client.postMessage(`SW Says: ${msg}`, [msgChannel.port2]);
  });
}

self.onnotificationclick = event => {
  // TODO window is not defined
  // window.open('http://www.mozilla.org', '_blank');
  console.log('On notification click: ', event.action, clients);
  messageToAll(event.action);
};

/*

self.addEventListener('notificationclick', event => {
  console.log('On notification click: ', event);
  switch (event.action) {
    case 'breakTime':
      console.log('breakTime');
      break;
    default:
      return;
  }
});

 */
