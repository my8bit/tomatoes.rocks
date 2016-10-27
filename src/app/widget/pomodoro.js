import React, {Component} from 'react';
// import Ink from 'react-ink';
import moment from 'moment';

// import {RippleButton} from 'react-ripple-effect';
// import Ripples from 'react-ripples';

document.addEventListener('DOMContentLoaded', () => {
  if (!Notification) {
    // alert('Desktop notifications not available in your browser. Try Chromium.');
    console.error('Desktop notifications not available in your browser. Try Chromium.');
    return;
  }

  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
});

function notifyMe() {
  if (Notification.permission === "granted") {
    navigator.serviceWorker.register("static/sw.js");
    navigator.serviceWorker.ready.then(registration => {
      registration.showNotification('Pomodoro done!', {
        vibrate: 200,
        icon: 'static/favicon-196x196.png',
        body: "Congrats! You finished yor pomodoro!"
      });
      // registration.onnotificationclick(() => window.open("http://stackoverflow.com/a/13328397/1269037"));
    });
    /*
    const notification = new Notification('Pomodoro done!', {
      icon: 'static/favicon-196x196.png',
      body: "Congrats! You finished yor pomodoro!"
    });
    notification.onclick = function () {
      window.open("http://stackoverflow.com/a/13328397/1269037");
    };
    */
  } else {
    Notification.requestPermission();
  }
}

// const duration25 = 1500000;
const duration25 = 1000;
const docTitle = document.getElementsByTagName('title')[0];

export class TimerWidget extends Component {
  constructor() {
    super();
    this.state = {time: duration25, running: false, buttonName: 'Start'};
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    if (this.state.running) {
      this.reset();
    } else {
      this.interval = setInterval(this.changeTime.bind(this), 1000);
      this.start();
    }
  }
  reset() {
    docTitle.textContent = "Tomatoes (pomodoro) work timer";
    clearInterval(this.interval);
    this.setState({animation: '', time: duration25, running: false, buttonName: 'Start'});
  }
  start() {
    this.setState({animation: 'animation', running: true, buttonName: 'Reset'});
  }
  timer() {
    this.interval = setInterval(this.changeTime.bind(this), 1000);
  }
  changeTime() {
    const time = this.state.time - 1000;
    if (time === 0) {
      notifyMe();
      this.reset();
    } else {
      this.setState({time});
    }
  }
  render() {
    let {time, buttonName, running} = this.state;
    const duration = moment.duration(time);
    let durationSec = "";
    if (duration.seconds().toString().length < 2) {
      durationSec = `0${duration.seconds()}`;
    } else {
      durationSec = duration.seconds();
    }
    const resultTime = `${duration.minutes()}:${durationSec}`;
    if (running) {
      docTitle.textContent = resultTime;
    }
    const animation = this.state.animation;
    // TODO add           <Ink/>
    return (
      <div id="container">
        <div className={animation} id="countdown">{resultTime}</div>
        <button style={{position: "fixed"}} className="button" autoFocus onClick={this.handleClick}>{buttonName}
        </button>
      </div>
    );
  }
}
// <button autoFocus onClick={this.handleClick}>{buttonName}</button>
// <RippleButton onClick={this.handleClick} className="button">{buttonName}</RippleButton>
