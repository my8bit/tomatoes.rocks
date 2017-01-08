import React, {Component} from 'react';
import {connect} from 'react-redux';
import {notifyMe} from '../workers/notification';
import {timerOptions} from '../../config';
import {getTimer, formatDate} from '../libs/timer';
// import {RippleButton} from 'react-ripple-effect';
// import Ripples from 'react-ripples';
// import Ink from 'react-ink';

const {buttonStatus, animation, interval} = timerOptions;
const {START, STOP} = buttonStatus;

class TimerWidget extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const {dispatch, startTime} = this.props;
    const type = startTime ? 'STOP' : 'START';
    dispatch({
      type,
      startTime: startTime ? 0 : (new Date()).getTime()
    });
  }

  componentDidMount() {
    this.interval = setInterval(this.forceUpdate.bind(this), interval || 1000);
  }

  componentWillUpdate() {
    const {dispatch, time, startTime} = this.props;
    if (getTimer(time, startTime) < 0) {
      dispatch({
        type: 'STOP'
      });
      notifyMe();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {startTime, time} = this.props;
    const currentTime = formatDate(time, startTime);
    // <Ink/>
    return (
      <div className="container">
        <div className={animation ? 'animation' : ''} id="countdown">{currentTime}</div>
        <button
          autoFocus
          className="button"
          onClick={this.handleClick}
          >
          {(startTime ? STOP : START).toUpperCase()}
        </button>
      </div>
    );
  }
}
// <button autoFocus onClick={this.handleClick}>{buttonName}</button>
// <RippleButton onClick={this.handleClick} className="button">{buttonName}</RippleButton>
TimerWidget.propTypes = {
  startTime: React.PropTypes.number.isRequired,
  time: React.PropTypes.number.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = store => {
  const {time, startTime} = store.timerReducer;
  return {time, startTime};
};

export const Timer = connect(mapStateToProps)(TimerWidget);
