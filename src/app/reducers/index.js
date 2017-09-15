import {colors, settings, timerOptions} from 'config';

console.log(settings);
const {currentTimerLength, breakTime} = timerOptions;
const savedColor = /* localStorage.getItem('color') || */ colors[1]; // TODO: check if there are localstorage

const getColor = color => {
  localStorage.setItem('color', color);
  return {color};
};

const hipchatToken = localStorage.getItem('hipchatToken') || '';

export const representationReducer = (state = {color: savedColor, hipchatToken}, action) => {
  switch (action.type) {
    case 'AUTHORIZED':
      return Object.assign({}, state, {
        hipchatToken: action.hipchatToken
      });
    case 'UNAUTHORIZED':
      return Object.assign({}, state, {
        hipchatToken: action.hipchatToken
      });
    case 'CHANGE_BACKGROUND':
      return Object.assign({}, state, getColor(action.color));
    case 'SAVE_HIPCHAT_TOKEN':
      return Object.assign({}, state, {
        hipchatToken: action.hipchatToken
      });
    default:
      return state;
  }
};

export const settingsReducer = (state = {settings}, action) => {
  switch (action.type) {
    case 'SETTING_CHANGED':
      return Object.assign({}, state, {settings: state.settings.map(
        (setting, idx) => Object.assign({}, setting,
          action.id === idx ? {value: action.value} : {})
        )});
    default:
      return state;
  }
};

export const userReducer = (state = {name: '', photo: ''}, action) => {
  switch (action.type) {
    case 'AUTHORIZED':
      return Object.assign({}, state, {
        name: action.name,
        photo: action.photo
      });
    case 'LOGOUT':
      return Object.assign({}, state, {
        name: ''
      });
    case 'LOGIN':
      return Object.assign({}, state, {
        name: action.name,
        photo: action.photo
      });
    case 'UNAUTHORIZED':
      return state;
    default:
      return state;
  }
};

export const timerReducer = (state = {
  currentTimerLength,
  startTime: 0,
  wasStopped: false,
  isBreak: false
}, action) => {
  switch (action.type) {
    case 'AUTHORIZED':
      return Object.assign({}, state, {
        startTime: action.startTime,
        wasStopped: action.wasStopped
      });
    case 'FINISH':
      // localStorage.setItem('startTime', 0);
      // console.log('time: state.isBreak ? breakTime : time,', state.isBreak);
      return Object.assign({}, state, {
        startTime: 0,
        wasStopped: action.wasStopped,
        currentTimerLength: state.isBreak ? currentTimerLength : breakTime,
        isBreak: !state.isBreak
      });
    case 'RESET':
      // localStorage.setItem('startTime', 0);
      return Object.assign({}, state, {
        startTime: 0,
        currentTimerLength,
        isBreak: false
      });
    case 'START':
      // localStorage.setItem('startTime', action.startTime);
      return Object.assign({}, state, {
        startTime: action.startTime
      });
    default:
      return state;
  }
};
