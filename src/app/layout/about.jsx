import React, {Component} from 'react';
import {ColorPickerCmp} from '../components/color-picker.jsx';
import {HipChatIntegration} from '../components/hipchat-input.jsx';

export class AboutCmp extends Component {
  render() {
    return (
      <section id="about" className="about site-wrap">
        <div className="menu-background">Settings</div>
        <div className="description">
          <h4>Please select background color:</h4>
          <ColorPickerCmp/>
        </div>
        <div className="description">
          <HipChatIntegration/>
        </div>
      </section>
    );
  }
}
