import React, {Component} from 'react';
import {connect} from 'react-redux';
import {timerOptions} from 'config';
import {formatTime, startUpdate, stopUpdate, isFinished} from '../libs/timer';
import Ink from 'react-ink';
import {timerAction, stopAction} from '../libs/firebase.auth';
const {buttonStatus: {START, STOP}} = timerOptions;

class TimerWidget extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.update = this.forceUpdate.bind(this);
  }

  componentDidMount() {
    startUpdate(this.update);
  }

  componentWillUnmount() {
    stopUpdate(this.update);
  }

  componentDidUpdate() {
    const {dispatch, currentTimerLength, startTime} = this.props;
    if (isFinished({currentTimerLength, startTime})) {
      dispatch(stopAction());
    }
  }

  handleClick() {
    const {dispatch, startTime} = this.props;
    dispatch(timerAction({startTime}));
  }

  render() {
    const {startTime, currentTimerLength} = this.props;
    return (
      <div className="container">
        <div id="countdown">{formatTime({currentTimerLength, startTime})}</div>
        <button
          autoFocus
          className="button"
          onClick={this.handleClick}
          >
          {(startTime ? STOP : START).toUpperCase()}
          <Ink/>
        </button>
      </div>
    );
  }
}

TimerWidget.propTypes = {
  startTime: React.PropTypes.number.isRequired,
  wasStopped: React.PropTypes.bool,
  currentTimerLength: React.PropTypes.number.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = store => {
  const {currentTimerLength, startTime, wasStopped} = store.timerReducer;
  return {currentTimerLength, startTime, wasStopped};
};

export const Timer = connect(mapStateToProps)(TimerWidget);
