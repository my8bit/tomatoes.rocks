import React, {Component} from 'react';
import {connect} from 'react-redux';
import {hipChatSaveToken} from '../libs/firebase.auth';

export class HipChatIntegrationCmp extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const {dispatch} = this.props;
    dispatch(hipChatSaveToken(event.target.value));
  }

  render() {
    const {hipchatToken} = this.props;

    return (
      <div className="group">
        <input onChange={this.handleChange} type="text" value={hipchatToken} required/>
        <span className="highlight"></span>
        <span className="bar"></span>
        <label>Your HipChat OAuth2 token, your name, and email separated by comma</label>
      </div>);
  }
}

HipChatIntegrationCmp.propTypes = {
  hipchatToken: React.PropTypes.string.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = store => {
  const {hipchatToken} = store.representationReducer;
  return {hipchatToken};
};

export const HipChatIntegration = connect(mapStateToProps)(HipChatIntegrationCmp);
