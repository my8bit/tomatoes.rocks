import React from 'react';
import ReactDOM from 'react-dom';

import {TimerWidget} from './app/widget/pomodoro';
import Offline from 'offline-plugin/runtime';

import './index.scss';

Offline.install();

ReactDOM.render(
  <TimerWidget/>,
  document.getElementById('container')
);
