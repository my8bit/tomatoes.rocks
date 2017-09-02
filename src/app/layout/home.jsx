import React, {Component} from 'react';
import {Timer} from '../components/pomodoro.jsx';
import {connect} from 'react-redux';
import Swipe from 'react-easy-swipe';

export class Home extends Component {
  handleOnSwipeRight() {
    // TODO: refactor
    document.getElementById('nav-trigger').checked = true;
  }

  handleOnSwipeLeft() {
    // TODO: refactor
    document.getElementById('nav-trigger').checked = false;
  }
  render() {
    const {color} = this.props;
    return (
      <section id="home" className="timer site-wrap" style={{backgroundColor: color}}>
        <Swipe
          onSwipeRight={this.handleOnSwipeRight}
          onSwipeLeft={this.handleOnSwipeLeft}
          >
          <Timer/>
        </Swipe>
      </section>
    );
  }
}

Home.propTypes = {color: React.PropTypes.string.isRequired};

const mapStateToProps = store => {
  const {color} = store.representationReducer;
  return {color};
};

export const HomeCmp = connect(mapStateToProps)(Home);
