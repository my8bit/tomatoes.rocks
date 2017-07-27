import {colors, timerOptions} from 'config';

const {time, breakTime} = timerOptions;
const savedColor = /* localStorage.getItem('color') || */ colors[0]; // TODO: check if there are localstorage

const getColor = color => {
  localStorage.setItem('color', color);
  return {color};
};

export const representationReducer = (state = {color: savedColor}, action) => {
  switch (action.type) {
    case 'CHANGE_BACKGROUND':
      return getColor(action.color);
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
    case 'WRITE-TIME':
      return Object.assign({}, state, {
      });
    case 'READ-TIME':
      return Object.assign({}, state, {
        startTime: action.startTime
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
  time,
  startTime: /* parseInt(localStorage.getItem('startTime'), 10) || */ 0,
  isBreak: true
}, action) => {
  switch (action.type) {
    case 'AUTHORIZED':
      // TODO fix the bug - blinking of outated value
      return Object.assign({}, state, {
        startTime: action.startTime
      });
    case 'STOP':
      // localStorage.setItem('startTime', 0);
      // console.log('time: state.isBreak ? breakTime : time,', state.isBreak);
      return Object.assign({}, state, {
        startTime: 0,
        time: state.isBreak ? breakTime : time,
        isBreak: !state.isBreak
      });
    case 'RESET':
      // localStorage.setItem('startTime', 0);
      return Object.assign({}, state, {
        startTime: 0,
        time,
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
