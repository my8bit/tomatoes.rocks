import Offline from 'offline-plugin/runtime';
Offline.install();
// TODO https://codelabs.developers.google.com/codelabs/add-to-home-screen/#5
// TODO https://developer.chrome.com/multidevice/android/installtohomescreen
// TODO https://mobiforge.com/design-development/taking-web-offline-service-workers

// import Helmet from 'react-helmet';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import cookie from 'react-cookie';
import {Home} from './app/layout/home';
import {ColorPicker} from './app/widget/color-picker';

import './index.scss';
// import firebase from 'firebase';
// firebase.initializeApp({});

class App extends Component {
  constructor(props) {
    super(props);
    const color = cookie.load('color') || 'tomato';
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      color
    };
  }
  handleChange(event) {
    const color = event.target.value;
    this.setState({
      color
    });
    cookie.save('color', color);
  }
  render() {
    const {color} = this.state;
    return (
      <div onChange={this.handleChange}>
        <Home color={color}/>
        <section id="about" className="about">
          <div className="description">Just another pomodoro timer that was inspired by Pomodoro Technique®.</div>
          <div className="description">Please select background color:
            <ColorPicker color={color}/>
          </div>
          <footer>
            <div className="footer-info">
              <p>This application is not affiliated with, associated with nor endorsed by the Pomodoro Technique® or Francesco Cirillo.</p>
              <p>This website uses cookies to ensure you get the best experience on our website.</p>
            </div>
          </footer>
        </section>
      </div>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);
