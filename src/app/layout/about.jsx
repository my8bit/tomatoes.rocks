import React, {Component} from 'react';
import {ColorPickerCmp} from '../components/color-picker.jsx';
import {settings} from 'config';

console.log(settings);

export class AboutCmp extends Component {
  getInput(setting) {
    return <input value={setting.value}/>;
  }
  render() {
    return (
      <section id="about" className="about site-wrap">
        <div className="menu-background">Settings</div>
        <div className="description">
          <h4>Please select background color:</h4>
          <ColorPickerCmp/>
        </div>
        {settings.map((setting, idx) => {
          return (
            <div key={idx} className="description">
              {this.getInput(setting)}
            </div>
          );
        })}
      </section>
    );
  }
}
