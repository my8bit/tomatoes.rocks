import React, {Component} from 'react';
import {connect} from 'react-redux';
import {notifyMe} from '../workers/notification';
import {timerOptions} from '../../config';
import {getTimer, formatDate, addToInterval, removeFromInterval} from '../libs/timer';
import Ink from 'react-ink';

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
    const type = startTime ? 'RESET' : 'START';
    dispatch({
      type,
      startTime: startTime ? 0 : (new Date()).getTime()
    });
  }

  componentWillUpdate(state) {
    const {dispatch, time, startTime} = this.props;
    if (getTimer(time, startTime) < 0 && state.startTime !== 0) {
      dispatch({
        type: 'STOP'
      });
      notifyMe();
    }
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
          style={{position: 'relative'}}
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
  time: React.PropTypes.number.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = store => {
  const {time, startTime} = store.timerReducer;
  return {time, startTime};
};

export const Timer = connect(mapStateToProps)(TimerWidget);
