import React, {Component} from 'react';
import {Timer} from '../components/timer.jsx';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {URL} from '../libs/common.js';

export class Home extends Component {
  render() {
    const {settings} = this.props;
    const color = settings[0].value;
    return (
      <section id="home" className="timer site-wrap" style={{backgroundColor: color}}>
        <Helmet
          link={[{rel: 'canonical', href: `${URL}${encodeURI(window.location.pathname)}`}]}
          />
        <div className="menu-background">
          <h1>Tomatoes Work</h1>
        </div>
        <Timer/>
      </section>
    );
  }
}

Home.propTypes = {
  settings: React.PropTypes.array.isRequired
};

const mapStateToProps = store => {
  const {settings} = store.settingsReducer;
  return {settings};
};

export const HomeCmp = connect(mapStateToProps)(Home);
