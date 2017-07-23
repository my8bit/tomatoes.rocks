import Offline from 'offline-plugin/runtime';
Offline.install();
import Ink from 'react-ink';

// TODO: https://codelabs.developers.google.com/codelabs/add-to-home-screen/#5
// TODO: https://developer.chrome.com/multidevice/android/installtohomescreen
// TODO: https://mobiforge.com/design-development/taking-web-offline-service-workers

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import Helmet from 'react-helmet';
import {Router, Route, IndexRoute, Link, browserHistory} from 'react-router';

import {HomeCmp} from './app/layout/home.jsx';
import {AboutCmp} from './app/layout/about.jsx';
import {textContent} from './config';
import {store} from './app/store';
import {formatDate, addToInterval, removeFromInterval} from './app/libs/timer';
import './index.scss';

import firebase from 'firebase';

firebase.initializeApp({
  apiKey: 'AIzaSyD0V9126DJnxV2bf6QD_I2jCD1ziGNOkDE',
  authDomain: 'tomatoes-7af08.firebaseapp.com',
  databaseURL: 'https://tomatoes-7af08.firebaseio.com',
  projectId: 'tomatoes-7af08',
  storageBucket: 'tomatoes-7af08.appspot.com',
  messagingSenderId: '773528556809'
});

const provider = new firebase.auth.TwitterAuthProvider();
const database = firebase.database();

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    console.log('%c User is signed in.', 'color: #39FF33;');
    console.log(user);
  } else {
    console.log('%c No user is signed in.', 'color: yellow;');
  }
});

window.writeKey = () => {
  const userId = firebase.auth().currentUser.uid;
  console.log(userId);
  database.ref(`users/${userId}`).set({
    foo: 'bar'
  });
};

window.readKey = () => {
  const userId = firebase.auth().currentUser.uid;
  return database.ref(`users/${userId}`).once('value').then(snapshot => {
    console.log(snapshot.val());
  });
};

function writeUserData(userId, photoURL) {
  firebase.database().ref(`users/${userId}`).set({
    photo: photoURL
  });
}

window.signInTwitter = () => {
  firebase.auth().signInWithPopup(provider).then(result => {
    // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
    // You can use these server side with your app's credentials to access the Twitter API.
    const token = result.credential.accessToken;
    const secret = result.credential.secret;
    // The signed-in user info.
    const user = result.user;
    console.log(token, secret, user);
    writeUserData(user.uid, user.photoURL);
  }).catch(error => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    const credential = error.credential;
    console.log(errorCode, errorMessage, email, credential);
  });
};

class SidebarList extends Component {
  render() {
    return (
      <ul className="navigation">
        <li className="nav-item"><Link to="/">Timer<Ink/></Link></li>
        <li className="nav-item"><Link to="/settings">Settings<Ink/></Link></li>
      </ul>
    );
  }
}

const appContainer = document.getElementById('app');

class Main extends Component {
  constructor(props) {
    super(props);
    this.update = this.forceUpdate.bind(this);
  }

  componentDidMount() {
    addToInterval(this.update);
  }

  componentWillUnmount() {
    removeFromInterval(this.update);
  }

  render() {
    const {color, time, startTime, children} = this.props;
    const currentTime = formatDate(time, startTime);
    return (
      <main>
        <Helmet
          title={startTime ? currentTime : textContent}
          link={[
            {rel: 'apple-touch-icon-precomposed', href: 'static/apple-touch-icon-57x57.png', sizes: '57x57'},
            {rel: 'apple-touch-icon-precomposed', href: 'static/apple-touch-icon-114x114.png', sizes: '114x114'},
            {rel: 'apple-touch-icon-precomposed', href: 'static/apple-touch-icon-72x72.png', sizes: '72x72'},
            {rel: 'apple-touch-icon-precomposed', href: 'static/apple-touch-icon-144x144.png', sizes: '144x144'},
            {rel: 'apple-touch-icon-precomposed', href: 'static/apple-touch-icon-60x60.png', sizes: '60x60'},
            {rel: 'apple-touch-icon-precomposed', href: 'static/apple-touch-icon-120x120.png', sizes: '120x120'},
            {rel: 'apple-touch-icon-precomposed', href: 'static/apple-touch-icon-76x76.png', sizes: '76x76'},
            {rel: 'apple-touch-icon-precomposed', href: 'static/apple-touch-icon-152x152.png', sizes: '152x152'},
            {rel: 'icon', type: 'image/png', href: 'static/favicon-196x196.png', sizes: '196x196'},
            {rel: 'icon', type: 'image/png', href: 'static/favicon-96x96.png', sizes: '96x96'},
            {rel: 'icon', type: 'image/png', href: 'static/favicon-32x32.png', sizes: '32x32'},
            {rel: 'icon', type: 'image/png', href: 'static/favicon-16x16.png', sizes: '16x16'},
            {rel: 'icon', type: 'image/png', href: 'static/favicon-128.png', sizes: '128x128'}
          ]}
          meta={[
            {name: 'description', content: 'Just another tomatoes (pomodoro) timer'},
            {name: 'application-name', content: textContent},
            {name: 'apple-mobile-web-app-capable', content: 'yes'},
            {name: 'mobile-web-app-capable', content: 'yes'},
            {name: 'msapplication-TileImage', content: 'static/mstile-144x144.png'},
            {name: 'msapplication-square70x70logo', content: 'static/mstile-70x70.png'},
            {name: 'msapplication-square150x150logo', content: 'static/mstile-150x150.png'},
            {name: 'msapplication-wide310x150logo', content: 'static/mstile-310x150.png'},
            {name: 'msapplication-square310x310logo', content: 'static/mstile-310x310.png'},
            {name: 'msapplication-TileColor', content: color},
            {name: 'theme-color', content: color},
            {name: 'msapplication-navbutton-color', content: color},
            {name: 'apple-mobile-web-app-status-bar-style', content: color}
          ]}
          />
        <SidebarList/>
        <input type="checkbox" id="nav-trigger" className="nav-trigger"/>
        <label htmlFor="nav-trigger">
          <div id="close-icon"><span></span><span></span><span></span></div>
        </label>
        {children}
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
  color: React.PropTypes.string.isRequired,
  children: React.PropTypes.element.isRequired
};

const App = connect(mapStateToProps)(Main);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <section>
        <Route path="/" component={App}>
          <IndexRoute component={HomeCmp}/>
          <Route path="/settings" component={AboutCmp}/>
        </Route>
      </section>
    </Router>
  </Provider>,
  appContainer
);
