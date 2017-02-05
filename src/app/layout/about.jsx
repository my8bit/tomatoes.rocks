import React, {Component} from 'react';
import {ColorPickerCmp} from '../components/color-picker.jsx';

export class AboutCmp extends Component {
  render() {
    return (
      <section id="about" className="about site-wrap">
        <div className="menu-background"></div>
        <div className="description">Just another pomodoro timer that was inspired by Pomodoro Technique®.</div>
        <div className="description">Please select background color:
          <ColorPickerCmp/>
        </div>
        <footer>
          <div className="footer-info">
            <p>This application is not affiliated with, associated with nor endorsed by the Pomodoro Technique® or Francesco Cirillo.</p>
          </div>
        </footer>
      </section>
    );
  }
}
