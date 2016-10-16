/* eslint-env jasmine */
import React from 'react';
import TestUtils from 'react/lib/ReactTestUtils';
import {TimerWidget} from './pomodoro';

describe('TimerWidget component', () => {
  it('should render pomodoro timer', () => {
    const timer = TestUtils.renderIntoDocument(<TimerWidget/>);
    const countdown = TestUtils.findRenderedDOMComponentWithTag(timer, 'div');
    expect(countdown.textContent).toEqual('25');
  });
});
