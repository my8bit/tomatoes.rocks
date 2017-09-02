import React, {Component} from 'react';
import {colors} from '../../config';
import {connect} from 'react-redux';

export class ColorPicker extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const {dispatch} = this.props;
    dispatch({
      type: 'CHANGE_BACKGROUND',
      color: event.target.value
    });
  }

  render() {
    const {color} = this.props;
    const options = colors.map((currentColor, idx) => {
      return (
        <div key={idx} className="color-container">
          <input
            className="input-color"
            onChange={this.handleChange}
            checked={color === currentColor}
            type="radio"
            name="color"
            style={{backgroundColor: currentColor}}
            value={currentColor}
            />
        </div>
      );
    });
    return <form className="picker-form">{options}</form>;
  }
}

ColorPicker.propTypes = {
  color: React.PropTypes.string.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = store => {
  const {color} = store.representationReducer;
  return {color};
};

export const ColorPickerCmp = connect(mapStateToProps)(ColorPicker);
