import {colors, timerOptions} from '../../config';

const {time} = timerOptions;
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

const startTime = 0;

export const timerReducer = (state = {time, startTime}, action) => {
  switch (action.type) {
    case 'STOP':
      return Object.assign({}, state, {
        startTime: 0
      });
    case 'START':
      return Object.assign({}, state, {
        startTime: action.startTime
      });
    default:
      return state;
  }
};
