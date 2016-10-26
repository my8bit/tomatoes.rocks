import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import cookie from 'react-cookie';

import {TimerWidget} from './app/widget/pomodoro';
//import Offline from 'offline-plugin/runtime';
import './index.scss';
//Offline.install();

/*
      <section class="main">
        <div id="container-timer"></div>
      </section>
      <section class="about">
        <p class="description">Just another pomodoro timer that was inspired by Pomodoro Technique®.</p>
        <footer>
        <!--
        <div>
          Form me on github
        </div>
        -->
        <div class="footer-info">
          This application is not affiliated with, associated with nor endorsed by the Pomodoro Technique® or Francesco Cirillo.
        </div>
        </footer>
      </section>
*/
class ColorPicker extends Component {
  constructor(props) {
    super(props);
    const color = cookie.load('color') || 'tomato';
    this.change = this.change.bind(this);
    this.state = {
      color
    }
  }
  change(event) {
    const color = event.target.value;
    document.querySelector('.main').setAttribute("style", `background: ${color};`);
    this.setState({
      color
    });
    cookie.save('color', color);
  }
  render() {
    const {color} = this.state;
    const style = {
      backgroundColor: color
    };
    return (
      <p className="description">Please select background color:
        <form>
          <div className="color-container"><input onChange={this.change} checked={color === '#ff5db1'} type="radio" name="gender" value="#ff5db1" /> <span style= {{backgroundColor: "#ff5db1" }} className="color-box"></span> </div>
          <div className="color-container"><input onChange={this.change} checked={color === 'beige'} type="radio" name="gender" value="beige" /> <span style= {{backgroundColor: "beige" }} className="color-box"></span> </div>
          <div className="color-container"><input onChange={this.change} checked={color === 'black'} type="radio" name="gender" value="black" /> <span style= {{backgroundColor: "black" }} className="color-box"></span> </div>
          <div className="color-container"><input onChange={this.change} checked={color === 'burlywood'} type="radio" name="gender" value="burlywood" /> <span style={ {backgroundColor: "burlywood" }} className="color-box"></span> </div>
          <div className="color-container"><input onChange={this.change} checked={color === 'tomato'} type="radio" name="gender" value="tomato" /> <span style= {{backgroundColor: "tomato" }} className="color-box"></span> </div>
          <div className="color-container"><input onChange={this.change} checked={color === 'tan'} type="radio" name="gender" value="tan" /> <span style= {{backgroundColor: "tan" }} className="color-box"></span> </div>
          <div className="color-container"><input onChange={this.change} checked={color === 'slategray'} type="radio" name="gender" value="slategray" /> <span style= {{backgroundColor: "slategray" }} className="color-box"></span> </div>
          <div className="color-container"><input onChange={this.change} checked={color === 'peachpuff'} type="radio" name="gender" value="peachpuff" /> <span style= {{backgroundColor: "peachpuff" }} className="color-box"></span> </div>
        </form>
      </p>
    );
  }
}

const color = cookie.load('color') || 'tomato';

ReactDOM.render(
  <div>
    <section className="main" style={{backgroundColor: color }}>
      <div id="container-timer">
        <TimerWidget/>
      </div>
    </section>
    <section className="about">
      <p className="description">Just another pomodoro timer that was inspired by Pomodoro Technique®.</p>
      <ColorPicker />
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
