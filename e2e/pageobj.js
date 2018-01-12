const filenamePrefix = process.env.DEVELOPMENT === 'true' ? '.dev' : '';
const conf = require(`../src/config${filenamePrefix}.json`);
const moment = require('moment');
require('moment-duration-format');

module.exports = {
  SELECTOR: {
    $ACTION_BUTTON: 'button.button',
    $TIME: '#countdown',
    $SETTINS_MENU: 'a[href="/settings"]',
    $COLOR_TOMATO: 'input[value="#ff6347"]'
  },
  TEXT: {
    TITLE: conf.textContent,
    TIME: moment
      .duration(conf.timerOptions.currentTimerLength, 'ms')
      .format('mm:ss', {trim: false}),
    BREAK_TIME: moment
      .duration(conf.timerOptions.breakTime, 'ms')
      .format('mm:ss', {trim: false}),
    ACTION_BUTTON_START: conf.timerOptions.buttonStatus.START.toUpperCase(),
    ACTION_BUTTON_STOP: conf.timerOptions.buttonStatus.STOP.toUpperCase()
  }
};
