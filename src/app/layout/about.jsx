import React, {Component} from 'react';
import Helmet from 'react-helmet';
import {URL} from '../libs/common.js';
// import {connect} from 'react-redux';
// import {ColorPickerCmp} from '../components/color-picker.jsx';

export class About extends Component {
  render() {
    return (// eslint-disable-line no-return-assign
      <section id="about" className="about site-wrap">
        <Helmet
          link={[{rel: 'canonical', href: `${URL}${window.location.pathname}`}]}
          title="About - online Pomodoro time tracker"
          />
        <div className="menu-background dark">
          <h1>About</h1>
        </div>
        <div className="container">
          <div itemScope itemType="http://schema.org/Organization">
            <span itemProp="name" content="Tomatoes Work"></span>
            <img itemProp="logo" title="tomatoew.work logo" alt="tomatoew.work logo" src="static/favicon-96x96.png"/>
          </div>
          <div className="description" itemScope itemType="http://schema.org/WebApplication">
            <div>
              <h2>Tomatoes Work</h2>
              <small>Online <span itemProp="applicationCategory">productivity</span> timer</small>
              <span itemProp="operatingSystem" content="Linux, Windows, OSX, iOS, Android"></span>
            </div>
            <div><a href="https://icons8.com">Icon pack by Icons8</a></div>
            <div>Icons was processed at <a href="http://www.favicomatic.com/">favicomatic</a></div>
            <div>Crafted with <span className="heart">❤︎</span> in ✖✖✖ by <a href="https://github.com/my8bit">@my8bit</a></div>
            <div><small>This application is not affiliated with, associated with nor endorsed by the Pomodoro Technique® or Francesco Cirillo. The Pomodoro Technique® and Pomodoro™ are registered trademarks by Francesco Cirillo.</small></div>
          </div>
        </div>
      </section>
    );
  }
}
