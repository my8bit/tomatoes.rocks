import React, {Component} from 'react';
import {TimerWidget} from '../components/pomodoro.jsx';
import {connect} from 'react-redux';

export class Home extends Component {
  render() {
    const {color} = this.props;
    return (
      <section id="home" className="main" style={{backgroundColor: color}}>
        <div id="container-timer">
          <TimerWidget/>
        </div>
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
