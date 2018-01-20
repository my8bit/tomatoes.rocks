import {settings, timerOptions} from 'config';
import {merge} from 'lodash';

const {currentTimerLength, breakTime} = timerOptions;

export const settingsReducer = (state = {settings}, action) => {
  switch (action.type) {
    case 'ANONYMOUS':
    case 'AUTHORIZED':
      return Object.assign({}, state, {
        settings: !console.log('Merged settings on \n', action.type,
          'from settings \n', settings,
          'from action.settings \n', action.settings,
          merge([], settings, action.settings)) && merge([], settings, action.settings)
      });
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
        name: '',
        photo: ''
      });
    default:
      return state;
  }
};

const timerInitialState = {
  currentTimerLength,
  startTime: 0,
  isBreak: false
};

export const timerReducer = (state = timerInitialState, action) => {
  switch (action.type) {
    case 'AUTHORIZED':
      return Object.assign({}, state, {
        startTime: action.startTime
      });
    case 'FINISH':
      return Object.assign({}, state, {
        startTime: 0,
        currentTimerLength: state.isBreak ? currentTimerLength : breakTime,
        isBreak: !state.isBreak
      });
    case 'RESET':
      return Object.assign({}, state, {
        startTime: 0,
        currentTimerLength,
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
