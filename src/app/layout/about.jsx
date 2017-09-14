import React, {Component} from 'react';
import {connect} from 'react-redux';
import {ColorPickerCmp} from '../components/color-picker.jsx';
import {changeAction} from '../actions';
import {settings} from 'config';

console.log(settings, changeAction);

export class Settings extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const {dispatch} = this.props;
    console.log(e.target.value);
    dispatch(changeAction(e.target.value));
  }

  getInput(setting) {
    const {value, type} = setting;

    switch (type) {
      case 'checkbox':
        return (
          <div className="rkmd-checkbox">
            <label className="input-checkbox checkbox-lightBlue">
              <input type="checkbox" id="checkbox-1" defaultChecked={value} defaultValue={value}/>
              <span className="checkbox"></span>
            </label>
            <label htmlFor="checkbox-1" className="label">Checkbox</label>
          </div>
        );
      case 'input':
        return (
          <div className="group">
            <input type="text" defaultValue={value} required/>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>Your HipChat OAuth2 token, your name, and email separated by comma</label>
          </div>
        );
      default:
        return '';
    }
  }

  render() {
    return (
      <section id="about" className="about site-wrap">
        <div className="menu-background">Settings</div>
        <div className="description">
          <h4>Please select background color:</h4>
          <ColorPickerCmp/>
        </div>
        <div onChange={this.handleChange} className="settings-wraper">
          {settings.map((setting, idx) => {
            return (
              <div key={idx} className="description">
                {this.getInput(setting)}
              </div>
            );
          })}
        </div>
      </section>
    );
  }
}

Settings.propTypes = {
  settings: React.PropTypes.array.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = store => {
  const {settings} = store.settingsReducer;
  return {settings};
};

export const AboutCmp = connect(mapStateToProps)(Settings);

