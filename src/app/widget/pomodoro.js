import React, {Component} from 'react';
import Helmet from 'react-helmet';
import moment from 'moment';
import 'moment-duration-format';
import {notifyMe} from '../workers/notification';
import {timerOptions, textContent} from '../../config';
// import {RippleButton} from 'react-ripple-effect';
// import Ripples from 'react-ripples';
// import Ink from 'react-ink';

const {time, buttonStatus, timerInterval} = timerOptions;
const {START, STOP} = buttonStatus;
// const docTitle = document.getElementsByTagName('title')[0];

export class TimerWidget extends Component {
  constructor() {
    super();
    this.state = Object.assign({}, timerOptions, {buttonName: buttonStatus.START});
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    const {running} = this.state;
    if (running) {
      this.reset();
    } else {
      this.interval = setInterval(this.changeTime.bind(this), timerInterval);
      this.start();
    }
  }
  reset() {
    // docTitle.textContent = textContent;
    clearInterval(this.interval);
    this.setState({animation: false, time, running: false, buttonName: START});
  }
  start() {
    this.setState({animation: true, running: true, buttonName: STOP});
  }
  timer() {
    this.interval = setInterval(this.changeTime.bind(this), timerInterval);
  }
  changeTime() {
    let {time} = this.state;
    time -= timerInterval;
    if (time <= 0) {
      notifyMe();
      this.reset();
    } else {
      this.setState({time});
    }
  }
  render() {
    const {time, animation, buttonName, running} = this.state;
    const resultTime = moment.duration(time, 'ms').format('mm:ss');
    // if (running) {
      // docTitle.textContent = resultTime;
    // }
    // <Ink/>
    return (
      <div id="container">
        <Helmet title={running ? resultTime : textContent}/>
        <div className={animation ? 'animation' : ''} id="countdown">{resultTime}</div>
        <button className="button" autoFocus onClick={this.handleClick}>{buttonName.toUpperCase()}</button>
      </div>
    );
  }
}
// <button autoFocus onClick={this.handleClick}>{buttonName}</button>
// <RippleButton onClick={this.handleClick} className="button">{buttonName}</RippleButton>
