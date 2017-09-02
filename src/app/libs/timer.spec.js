import moment from 'moment';

const timer = require('./timer');
const {isFinished} = timer;

describe('isFinished tests', () => {
  test('isFinished function when timer expired 2 min ago', () => {
    const twoMinAgo = moment().add(-2, 'm').valueOf();
    const oneMinuteTimerLength = moment.duration(1, 'minutes').valueOf();
    const options = {
      currentTimerLength: oneMinuteTimerLength,
      startTime: twoMinAgo
    };
    expect(isFinished(options)).toBe(true);
  });

  test('isFinished function when timer just started', () => {
    const now = moment().valueOf();
    const oneMinuteTimerLength = moment.duration(1, 'minutes').valueOf();
    const options = {
      currentTimerLength: oneMinuteTimerLength,
      startTime: now
    };
    expect(isFinished(options)).toBe(false);
  });

  test('isFinished function when timer duration is 0', () => {
    const now = moment().valueOf();
    const zeroMinuteTimerLength = 0;
    const options = {
      currentTimerLength: zeroMinuteTimerLength,
      startTime: now
    };
    expect(isFinished(options)).toBe(false);
  });

  test('isFinished function when start time is 0', () => {
    const zero = 0;
    const oneMinuteTimerLength = moment.duration(1, 'minutes').valueOf();
    const options = {
      currentTimerLength: oneMinuteTimerLength,
      startTime: zero
    };
    expect(isFinished(options)).toBe(false);
  });
});


