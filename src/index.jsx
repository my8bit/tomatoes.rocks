import Offline from 'offline-plugin/runtime';
Offline.install();

// TODO: https://codelabs.developers.google.com/codelabs/add-to-home-screen/#5
// TODO: https://developer.chrome.com/multidevice/android/installtohomescreen
// TODO: https://mobiforge.com/design-development/taking-web-offline-service-workers

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import Helmet from 'react-helmet';

import {HomeCmp} from './app/layout/home.jsx';
// import {AboutCmp} from './app/layout/about.jsx';
import {textContent} from './config';
import {store} from './app/store';
import {formatDate} from './app/libs/timer';
import './index.scss';
// import firebase from 'firebase';
// firebase.initializeApp({});

const appContainer = document.getElementById('app');

class Main extends Component {
  render() {
    const {color, time, startTime} = this.props;
    // console.log(now);
    const currentTime = formatDate(time, startTime);

    // TODO: create a headr component separately in layout directory
    // and move interval to libs timer to be able to add interval functions callbacks into queue
    return (
      <main>
        <Helmet
          title={startTime ? currentTime : textContent}
          meta={[
            {name: 'theme-color', content: color},
            {name: 'msapplication-navbutton-color', content: color},
            {name: 'apple-mobile-web-app-status-bar-style', content: color}
          ]}
          />
        <HomeCmp/>
        {/* <AboutCmp/> */}
      </main>
    );
  }
}

const mapStateToProps = store => {
  const {color} = store.representationReducer;
  const {time, startTime} = store.timerReducer;
  return {color, time, startTime};
};

Main.propTypes = {
  startTime: React.PropTypes.number.isRequired,
  time: React.PropTypes.number.isRequired,
  color: React.PropTypes.string.isRequired
};

const App = connect(mapStateToProps)(Main);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  appContainer
);
