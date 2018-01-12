import React, {Component} from 'react';
import {connect} from 'react-redux';
import {timerOptions} from 'config';
import {formatTime, startUpdate, stopUpdate} from '../libs/timer';
import Ink from 'react-ink';
import {timerAction} from '../actions';

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

  handleClick() {
    const {dispatch, startTime} = this.props;
    dispatch(timerAction(startTime));
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
  currentTimerLength: React.PropTypes.number.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = store => {
  const {currentTimerLength, startTime} = store.timerReducer;
  return {currentTimerLength, startTime};
};

export const Timer = connect(mapStateToProps)(TimerWidget);
