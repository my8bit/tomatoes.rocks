import React from 'react';
import ReactDOM from 'react-dom';

import {TimerWidget} from './app/widget/pomodoro';

import './index.scss';

ReactDOM.render(
  <TimerWidget/>,
  document.getElementById('container')
);
