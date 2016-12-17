import React, {Component} from 'react';
import {colors} from '../../config';

export class ColorPicker extends Component {
  constructor(props) {
    super(props);
    const {color} = props;
    this.handleChange = this.handleChange.bind(this);
    this.state = {color};
  }
  handleChange(event) {
    const color = event.target.value;
    this.setState({color});
  }
  render() {
    const {color} = this.state;
    const options = colors.map((currentColor, idx) => {
      return (
        <div key={idx} className="color-container">
          <input
            onChange={this.handleChange}
            checked={color === currentColor}
            type="radio"
            name="color"
            value={currentColor}
            />
          <span style={{backgroundColor: currentColor}} className="color-box"></span>
        </div>
      );
    });
    return <form>{options}</form>;
  }
}
