import React, {Component} from 'react';

export class TimerWidget extends Component {
  constructor() {
    super();
    this.state = {time: 25, running: false, buttonName: 'Start'};
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    if (this.state.running) {
      clearInterval(this.interval);
      this.reset();
    } else {
      this.interval = setInterval(this.changeTime.bind(this), 1000);
      this.start();
    }
  }
  reset() {
    this.setState({time: 25, running: false, buttonName: 'Start'});
  }
  start() {
    this.setState({running: true, buttonName: 'Reset'});
  }
  timer() {
    this.interval = setInterval(this.changeTime.bind(this), 1000);
  }
  changeTime() {
    const time = this.state.time - 1;
    this.setState({time});
  }
  render() {
    let {time, buttonName} = this.state;
    return (
      <div>
        <div id="countdown">{time}</div>
        <button onClick={this.handleClick}>{buttonName}</button>
      </div>
    );
  }
}
