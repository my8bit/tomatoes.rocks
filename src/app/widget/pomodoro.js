import React, {Component} from 'react';
import Authlify from 'authlify-js'

const authlify = new Authlify({
  APIUrl: 'https://authlify.netlify.com'
});

authlify.signup("my8bit", "mail@my8bit.name").then(
  response => console.log("Confirmation email sent", response),
  error => console.log("Error during signup: %o", error.msg)
);
/*
authlify.confirm(token).then(
  (user) => console.log("Logged in as %s", user.email),
  (error) => console.log("Failed to log in: %o", error)
);

authlify.login(email, password).then(
  (user) => console.log("Logged in as %s", user.email),
  (error) => console.log("Failed to log in: %o", error)
)

authlify.requestPasswordRecovery(email).then(
  (response) => console.log("Recovery email sent"),
  (error) => console.log("Error sending recovery mail: %o", error)
);

authlify.recover(token).then(
  (user) => console.log("Logged in as %s", user.email),
  (error) => console.log("Failed to verify recover token: %o", error)
);
*/
const user = authlify.currentUser();
console.log(user);
/*
user.update({email: newEmail, password: newPassword}).then(
  (user) => console.log("Updated user"),
  (error) => console.log("Failed to update user: %o", error)
);

user.jwt().then(
  (token) => console.log("Current token: %s", token),
  (error) => console.log("Failed to get token: %o", error)
);

user.logout().then(
  (response) => console.log("User logged out"),
  (error) => console.log("Failed to logout user: %o", error)
);
*/
export class TimerWidget extends Component {
  constructor() {
    super();
    this.state = {time: 25, running: false, buttonName: 'Start'};
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    if (this.state.running) {
      clearInterval(this.interval);
      this.reset();
    } else {
      this.interval = setInterval(this.changeTime.bind(this), 1000);
      this.start();
    }
  }
  reset() {
    this.setState({time: 25, running: false, buttonName: 'Start'});
  }
  start() {
    this.setState({running: true, buttonName: 'Reset'});
  }
  timer() {
    this.interval = setInterval(this.changeTime.bind(this), 1000);
  }
  changeTime() {
    const time = this.state.time - 1;
    this.setState({time});
  }
  render() {
    let {time, buttonName} = this.state;
    return (
      <div>
        <div id="countdown">{time}</div>
        <button onClick={this.handleClick}>{buttonName}</button>
      </div>
    );
  }
}
