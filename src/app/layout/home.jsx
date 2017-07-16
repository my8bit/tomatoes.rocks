import React, {Component} from 'react';
import {Timer} from '../components/pomodoro.jsx';
import {connect} from 'react-redux';

export class Home extends Component {
  render() {
    const {color} = this.props;
    return (
      <section id="home" className="timer site-wrap" style={{backgroundColor: color}}>
        <Timer/>
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
