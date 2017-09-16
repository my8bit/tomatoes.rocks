import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {ColorPickerCmp} from '../components/color-picker.jsx';
import {changeAction} from '../actions';
// import {changeAction} from '../libs/firebase.auth';
import {colors} from 'config';

// console.log(settings, changeAction);

export class Settings extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const {dispatch} = this.props;
    const {target: {dataset, type, value, checked, id}} = e;
    debugger;
    let settingValue;
    switch (type) {
      case 'checkbox':
        settingValue = checked;
        break;
      case 'radio':
      case 'text':
        settingValue = value;
        break;
      default:
        break;
    }
    dispatch(changeAction(settingValue, parseInt(id || dataset.id, 10)));
  }

  getInput(setting, idx) {
    const {value, type, name} = setting;

    switch (type) {
      case 'checkbox':
        return (
          <div className="rkmd-checkbox">
            <label className="input-checkbox checkbox-lightBlue">
              <input type="checkbox" id={idx} defaultValue={value}/>
              <span className="checkbox"></span>
            </label>
            <label htmlFor={idx} className="label">{name}</label>
          </div>
        );
      case 'input':
        return (
          <div className="group">
            <input type="text" id={idx} defaultValue={value} required/>
            <span className="highlight"></span>
            <span className="bar"></span>
            <label>{name}</label>
          </div>
        );
      case 'color-picker':
        return (
          <form className="picker-form">
            <label>{name}</label>
            {colors.map((currentColor, index) => {
              return (
                <div key={index} className="color-container">
                  <input
                    className="input-color"
                    readOnly
                    checked={value === currentColor}
                    type="radio"
                    name="color"
                    data-id={idx}
                    style={{backgroundColor: currentColor}}
                    value={currentColor}
                    />
                </div>
              );
            })}
          </form>
        );
      default:
        return '';
    }
  }

  render() {
    // debugger;
    const {settings} = this.props;
    // console.log('this.props.settings', this.props.settings);
    // console.log(settings);
    return (
      <section id="about" className="about site-wrap">
        <div className="menu-background">Settings</div>
        <div onChange={this.handleChange} className="settings-wraper">
          {settings.map((setting, idx) => {
            return (
              <div key={idx} className="description">
                {this.getInput(setting, idx)}
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

