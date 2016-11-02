import React, {Component} from 'react';
import {TimerWidget} from '../widget/pomodoro';

export class Home extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

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
