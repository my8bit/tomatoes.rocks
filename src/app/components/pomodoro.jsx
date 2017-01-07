import React, {Component} from 'react';
import Helmet from 'react-helmet';
import moment from 'moment';
import {connect} from 'react-redux';
import 'moment-duration-format';
import {notifyMe} from '../workers/notification';
import {timerOptions, textContent} from '../../config';
// import {RippleButton} from 'react-ripple-effect';
// import Ripples from 'react-ripples';
// import Ink from 'react-ink';

const {buttonStatus, animation} = timerOptions;
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
    const {interval} = this.props;
    this.interval = setInterval(this.forceUpdate.bind(this), interval || 1000);
  }

  componentWillUpdate() {
    const {dispatch} = this.props;
    if (this.getTimer() < 0) {
      dispatch({
        type: 'STOP'
      });
      notifyMe();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getTimer() {
    const {time, startTime} = this.props;
    return time - (startTime ? (new Date()).getTime() - startTime : 0);
  }

  formatDate() {
    return moment.duration(this.getTimer(), 'ms').format('mm:ss');
  }

  render() {
    const {startTime, color} = this.props;
    const currentTime = this.formatDate();
    // <Ink/>
    return (
      <div id="container">
        <Helmet
          title={startTime ? currentTime : textContent}
          meta={[
            {name: 'theme-color', content: color},
            {name: 'msapplication-navbutton-color', content: color},
            {name: 'apple-mobile-web-app-status-bar-style', content: color}
          ]}
          />
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
  interval: React.PropTypes.number.isRequired,
  time: React.PropTypes.number.isRequired,
  dispatch: React.PropTypes.func.isRequired,
  color: React.PropTypes.string.isRequired
};

const mapStateToProps = store => {
  const {time, startTime, interval} = store.timerReducer;
  const {color} = store.representationReducer;
  return {time, startTime, interval, color};
};

export const Timer = connect(mapStateToProps)(TimerWidget);
