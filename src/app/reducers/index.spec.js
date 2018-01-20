const {timerReducer} = require('./index');
import {timerOptions} from 'config';
const {breakTime} = timerOptions;

describe('timer reducer test', () => {
  test('after main timer finished the break timer is set up', () => {
    const startFromInit = timerReducer(undefined, {
      type: 'START',
      startTime: 1
    });
    const finish = timerReducer(startFromInit, {
      type: 'FINISH'
    });
    expect(finish).toEqual({
      currentTimerLength: breakTime, startTime: 0, isBreak: true
    });
  });

  test('when start break timer it marked as break', () => {
    const startFromInit = timerReducer(undefined, {
      type: 'START',
      startTime: 1
    });
    const finish = timerReducer(startFromInit, {
      type: 'FINISH'
    });
    const startAgain = timerReducer(finish, {
      type: 'START',
      startTime: 2
    });
    expect(startAgain).toEqual({
      currentTimerLength: breakTime, startTime: 2, isBreak: true
    });
  });
});
