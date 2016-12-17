import Offline from 'offline-plugin/runtime';
Offline.install();
// TODO: https://codelabs.developers.google.com/codelabs/add-to-home-screen/#5
// TODO: https://developer.chrome.com/multidevice/android/installtohomescreen
// TODO: https://mobiforge.com/design-development/taking-web-offline-service-workers

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Home} from './app/layout/home';
import {ColorPicker} from './app/widget/color-picker';
import {colors} from './config';

import './index.scss';
// import firebase from 'firebase';
// firebase.initializeApp({});

class App extends Component {
  constructor(props) {
    super(props);
    const color = localStorage.getItem('color') || colors[0]; // TODO: check if there are localstorage
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
    localStorage.setItem('color', color);
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
