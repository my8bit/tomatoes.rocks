import React, {Component} from 'react';

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
    const colorRadioOptions = [
      'beige',
      'black',
      'burlywood',
      'tomato',
      'tan',
      'lightblue',
      'lightgreen'
    ].map((currentColor, idx) => {
      return (
        <div key={idx} className="color-container">
          <input
            onChange={this.handleChange}
            checked={color === currentColor}
            type="radio"
            name="gender"
            value={currentColor}
            />
          <span style={{backgroundColor: currentColor}} className="color-box"></span>
        </div>
      );
    });
    return <form>{colorRadioOptions}</form>;
  }
}
