import React, {Component} from 'react';
import Ink from 'react-ink';
import {NavLink} from 'react-router-dom';
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

  handleLogin(e) {
    const {dispatch} = this.props;
    dispatch(loginAction(e.currentTarget.id));
  }

  handleLogout() {
    const {dispatch} = this.props;
    dispatch(logoutAction());
  }

  menuItem(name, icon, link) {
    return (
      <li className="nav-item">
        <NavLink exact to={link} activeClassName="active-menu">
          {name}
          <i className={`fa ${icon} right`} aria-hidden="true"></i>
          <Ink/>
        </NavLink>
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
                <div className="user-name">{name}</div>
                <div className="user-status">
                  Logout <i className="fa icon-logout right" aria-hidden="true"></i>
                </div>
              </div>
            </div>
          </li> :
          <li>
            <ul>
              <li id="twitter" className="nav-item" onClick={this.handleLogin}>
                <div className="logout">Sign in with Twitter <i className="fa icon-twitter right" aria-hidden="true"></i><Ink/></div>
              </li>
              <li id="github" className="nav-item" onClick={this.handleLogin}>
                <div className="logout">Sign in with Github <i className="fa icon-github-circled right" aria-hidden="true"></i><Ink/></div>
              </li>
            </ul>
          </li>
        }
        {this.menuItem('Timer', 'icon-stopwatch', '/')}
        {this.menuItem('Settings', 'icon-wrench', '/settings')}
        {this.menuItem('About', 'icon-help-circled', '/about')}
        {/* <li className="nav-item">
          <div className="addthis_inline_share_toolbox"></div>
        </li>
        this.menuItem('F.A.Q.', 'icon-help-circled', '/faq') */}
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
