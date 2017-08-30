import React, {Component} from 'react';
import {connect} from 'react-redux';
import {notifyMe} from '../workers/notification';
import {timerOptions} from 'config';
import {getTimer, formatDate, addToInterval, removeFromInterval} from '../libs/timer';
import Ink from 'react-ink';
import Swipe from 'react-easy-swipe';
import {timerAction, stopAction} from '../libs/firebase.auth';

const {buttonStatus, animation} = timerOptions;
const {START, STOP} = buttonStatus;

class TimerWidget extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.update = this.forceUpdate.bind(this);
  }

  componentDidMount() {
    addToInterval(this.update);
  }

  componentWillUnmount() {
    removeFromInterval(this.update);
  }

  handleClick() {
    const {dispatch, startTime} = this.props;
    dispatch(timerAction(startTime));
  }

  componentWillUpdate(state) {
    const {dispatch, startTime, time, wasStopped} = this.props;
    if (getTimer(time, startTime) < 0 && state.startTime !== 0) {
      dispatch(stopAction());
      //if (wasStopped) {
        notifyMe();
      //} else {
      //  console.warn('timer was not stopped for some reasons');
      //}
    }
  }

  handleOnSwipeRight() {
    // TODO: refactor
    document.getElementById('nav-trigger').checked = true;
  }

  handleOnSwipeLeft() {
    // TODO: refactor
    document.getElementById('nav-trigger').checked = false;
  }

  render() {
    const {startTime, time} = this.props;
    const currentTime = formatDate(time, startTime);
    return (
      <Swipe
        onSwipeRight={this.handleOnSwipeRight}
        onSwipeLeft={this.handleOnSwipeLeft}
        >
        <div className="container">
          <div className={animation ? 'animation' : ''} id="countdown">{currentTime}</div>
          <button
            autoFocus
            style={{position: 'relative'}}
            className="button"
            onClick={this.handleClick}
            >
            {(startTime ? STOP : START).toUpperCase()}
            <Ink/>
          </button>
        </div>
      </Swipe>
    );
  }
}

TimerWidget.propTypes = {
  startTime: React.PropTypes.number.isRequired,
  wasStopped: React.PropTypes.bool,
  time: React.PropTypes.number.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = store => {
  const {time, startTime, wasStopped} = store.timerReducer;
  return {time, startTime, wasStopped};
};

export const Timer = connect(mapStateToProps)(TimerWidget);
