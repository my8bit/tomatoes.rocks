import React, {Component} from 'react';
import Ink from 'react-ink';

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
    navigator.serviceWorker.register('sw.js');
    navigator.serviceWorker.ready.then(registration => {
      registration.showNotification('Notification with ServiceWorker');
    });
    const notification = new Notification('Notification title', {
      icon: 'http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png',
      body: "Hey there! You've been notified!"
    });
    notification.onclick = function () {
      window.open("http://stackoverflow.com/a/13328397/1269037");
    };
  } else {
    Notification.requestPermission();
  }
}

export class TimerWidget extends Component {
  constructor() {
    super();
    this.state = {time: 25, running: false, buttonName: 'Start'};
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
    clearInterval(this.interval);
    this.setState({animation: '', time: 25, running: false, buttonName: 'Start'});
  }
  start() {
    this.setState({animation: 'animation', running: true, buttonName: 'Reset'});
  }
  timer() {
    this.interval = setInterval(this.changeTime.bind(this), 1000);
  }
  changeTime() {
    const time = this.state.time - 1;
    if (time === 0) {
      notifyMe();
      this.reset();
    } else {
      this.setState({time});
    }
  }
  render() {
    let {time, buttonName} = this.state;
    const animation = this.state.animation;
    return (
      <div>
        <div className={animation} id="countdown">{time}</div>
        <button className="button" autoFocus onClick={this.handleClick}>{buttonName}
          <Ink/>
        </button>
      </div>
    );
  }
}
// <button autoFocus onClick={this.handleClick}>{buttonName}</button>
// <RippleButton onClick={this.handleClick} className="button">{buttonName}</RippleButton>
