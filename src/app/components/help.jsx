import React, {Component} from 'react';
import Ink from 'react-ink';

export class HelpCmp extends Component {
  constructor() {
    super();
    this.handleToggleHelp = this.handleToggleHelp.bind(this);
    this.helpClassList = document.getElementById('description');
  }
  handleToggleHelp() {
    this.helpClassList.classList.remove('invisible');
  }
  render() {
    return (
      <li className="nav-item">
        <a onClick={this.handleToggleHelp}>
          Help
          <i className="fa icon-help-circled right" aria-hidden="true"></i>
          <Ink/>
        </a>
      </li>
    );
  }
}
