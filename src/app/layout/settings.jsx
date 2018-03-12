import React, {Component} from 'react';
import {connect} from 'react-redux';
import {changeAction} from '../actions';
import {colors} from 'config';
import Helmet from 'react-helmet';
import {URL} from '../libs/common.js';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const {dispatch} = this.props;
    const {target: {dataset, type, value, checked, id}} = e;
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
    // TODO: remove dummy onChange by ignore this rule
    switch (type) {
      case 'checkbox':
        return (
          <div className="rkmd-checkbox">
            <label className="input-checkbox checkbox-lightBlue">
              <input checked={value} type="checkbox" id={idx} onChange={function () {}} value={value}/>
              <span className="checkbox"></span>
            </label>
            <label htmlFor={idx} className="label">{name}</label>
          </div>
        );
      case 'input':
        return (
          <div className="group">
            <input type="text" id={idx} value={value} onChange={function () {}} required/>
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
    const {settings} = this.props;
    return (
      <section id="settings" className="about site-wrap">
        <Helmet
          link={[{rel: 'canonical', href: `${URL}${window.location.pathname}`}]}
          title="Settings"
          />
        <div className="menu-background dark">
          <h1>Settings</h1>
        </div>
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

export const SettingsCmp = connect(mapStateToProps)(Settings);
