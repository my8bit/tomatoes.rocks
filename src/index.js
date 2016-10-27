import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import cookie from 'react-cookie';

import {TimerWidget} from './app/widget/pomodoro';
// import Offline from 'offline-plugin/runtime';
import './index.scss';
// Offline.install();

class ColorPicker extends Component {
  constructor(props) {
    super(props);
    const color = cookie.load('color') || 'tomato';
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      color
    };
  }
  handleChange(event) {
    const color = event.target.value;
    document.querySelector('.main').setAttribute("style", `background: ${color};`);
    this.setState({
      color
    });
    cookie.save('color', color);
  }
  render() {
    const {color} = this.state;

    return (
      <form>
        <div className="color-container"><input onChange={this.handleChange} checked={color === '#ff5db1'} type="radio" name="gender" value="#ff5db1"/> <span style={{backgroundColor: "#ff5db1"}} className="color-box"></span> </div>
        <div className="color-container"><input onChange={this.handleChange} checked={color === 'beige'} type="radio" name="gender" value="beige"/> <span style={{backgroundColor: "beige"}} className="color-box"></span> </div>
        <div className="color-container"><input onChange={this.handleChange} checked={color === 'black'} type="radio" name="gender" value="black"/> <span style={{backgroundColor: "black"}} className="color-box"></span> </div>
        <div className="color-container"><input onChange={this.handleChange} checked={color === 'burlywood'} type="radio" name="gender" value="burlywood"/> <span style={{backgroundColor: "burlywood"}} className="color-box"></span> </div>
        <div className="color-container"><input onChange={this.handleChange} checked={color === 'tomato'} type="radio" name="gender" value="tomato"/> <span style={{backgroundColor: "tomato"}} className="color-box"></span> </div>
        <div className="color-container"><input onChange={this.handleChange} checked={color === 'tan'} type="radio" name="gender" value="tan"/> <span style={{backgroundColor: "tan"}} className="color-box"></span> </div>
        <div className="color-container"><input onChange={this.handleChange} checked={color === 'slategray'} type="radio" name="gender" value="slategray"/> <span style={{backgroundColor: "slategray"}} className="color-box"></span> </div>
        <div className="color-container"><input onChange={this.handleChange} checked={color === 'peachpuff'} type="radio" name="gender" value="peachpuff"/> <span style={{backgroundColor: "peachpuff"}} className="color-box"></span> </div>
      </form>
    );
  }
}

const color = cookie.load('color') || 'tomato';

ReactDOM.render(
  <div>
    <section id="home" className="main" style={{backgroundColor: color}}>
      <div id="container-timer">
        <TimerWidget/>
      </div>
    </section>
    <section id="about" className="about">
      <div className="description">Just another pomodoro timer that was inspired by Pomodoro Technique®.</div>
      <div className="description">Please select background color:
        <ColorPicker/>
      </div>
      <footer>
        <div className="footer-info">
          <p>This application is not affiliated with, associated with nor endorsed by the Pomodoro Technique® or Francesco Cirillo.</p>
          <p>This website uses cookies to ensure you get the best experience on our website.</p>
        </div>
      </footer>
    </section>
  </div>,
  document.getElementById('app')
);
