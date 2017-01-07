import Offline from 'offline-plugin/runtime';
Offline.install();

// TODO: https://codelabs.developers.google.com/codelabs/add-to-home-screen/#5
// TODO: https://developer.chrome.com/multidevice/android/installtohomescreen
// TODO: https://mobiforge.com/design-development/taking-web-offline-service-workers

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {HomeCmp} from './app/layout/home.jsx';
import {AboutCmp} from './app/layout/about.jsx';

import {store} from './app/store';
import './index.scss';
// import firebase from 'firebase';
// firebase.initializeApp({});

ReactDOM.render(
  <Provider store={store}>
    <main>
      <HomeCmp/>
      <AboutCmp/>
    </main>
  </Provider>,
  document.getElementById('app')
);
