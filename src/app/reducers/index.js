import {colors, timerOptions} from '../../config';

const {time, breakTime} = timerOptions;
const savedColor = localStorage.getItem('color') || colors[0]; // TODO: check if there are localstorage

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

export const timerReducer = (state = {time, startTime: 0, isBreak: false}, action) => {
  console.log('state.isBreak', state.isBreak, 'action.type', action.type);
  switch (action.type) {
    case 'STOP':
      return Object.assign({}, state, {
        startTime: 0,
        time: state.isBreak ? breakTime : time,
        isBreak: !state.isBreak
      });
    case 'RESET':
      return Object.assign({}, state, {
        startTime: 0,
        time,
        isBreak: false
      });
    case 'START':
      return Object.assign({}, state, {
        startTime: action.startTime
      });
    default:
      return state;
  }
};
