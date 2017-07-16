import React, {Component} from 'react';
import {ColorPickerCmp} from '../components/color-picker.jsx';
import {fullScreen} from '../../config.json';

export class AboutCmp extends Component {
  render() {
    const wPac = window.wPac || [];
    wPac.push({widget: 'Rating', id: 3784});
    return (
      <section id="about" className="about site-wrap">
        <div className="menu-background"></div>
        <div className="description">Just another pomodoro timer that was inspired by Pomodoro Technique®.</div>
        <div className="description">
          <h4>Please select background color:</h4>
          <ColorPickerCmp/>
        </div>
        <div className="description">
          {fullScreen && <button
            onClick={function () {
              document.getElementById('app').webkitRequestFullScreen();
            }}
            >
            FullScreen
          </button>}
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
