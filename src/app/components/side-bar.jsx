import React, {Component} from 'react';
import Ink from 'react-ink';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {checkAuth, logoutAction, loginAction} from '../libs/firebase.auth';

class SidebarList extends Component {
  constructor() {
    super();
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(checkAuth());
  }

  handleLogin() {
    const {dispatch} = this.props;
    dispatch(loginAction());
  }

  handleLogout() {
    const {dispatch} = this.props;
    dispatch(logoutAction());
  }

  menuItem(name, icon, link) {
    return (
      <li className="nav-item">
        <Link to={link}>
          {name}
          <i className={`fa ${icon} right`} aria-hidden="true"></i>
          <Ink/>
        </Link>
      </li>
    );
  }

  render() {
    const {name, photo} = this.props;
    return (
      <ul className="navigation">
        {name ?
          <li className="nav-item" onClick={this.handleLogout}>
            <div className="login-container">
              <img className="avatar" src={photo}/>
              <div className="user-info">
                <div className="user-name">
                  {name}
                </div>
                <div className="user-status">
                  Logout <i className="fa fa-sign-out right" aria-hidden="true"></i><Ink/>
                </div>
              </div>
            </div>
          </li> :
          <li className="nav-item" onClick={this.handleLogin}>
            <div className="logout">Sign in with Twitter <i className="fa icon-twitter right" aria-hidden="true"></i><Ink/></div>
          </li>}
        {this.menuItem('Timer', 'fa-clock-o', '/')}
        {this.menuItem('Settings', 'fa-wrench', '/settings')}
        {this.menuItem('F.A.Q.', 'fa-wrench', '/faq')}
      </ul>
    );
  }
}

SidebarList.propTypes = {
  name: React.PropTypes.string,
  photo: React.PropTypes.string,
  dispatch: React.PropTypes.func.isRequired
};

const mapStateToProps = store => {
  const {name, photo} = store.userReducer;
  return {name, photo};
};

export const SidebarCmp = connect(mapStateToProps)(SidebarList);
