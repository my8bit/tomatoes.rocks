import 'babel-polyfill';
import Offline from 'offline-plugin/runtime';
Offline.install();

// TODO: https://codelabs.developers.google.com/codelabs/add-to-home-screen/#5
// TODO: https://developer.chrome.com/multidevice/android/installtohomescreen
// TODO: https://mobiforge.com/design-development/taking-web-offline-service-workers
import Swipe from 'react-easy-swipe';

import React, {Component} from 'react';
import {render} from 'react-dom';
import {Provider, connect} from 'react-redux';
import Helmet from 'react-helmet';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
// import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {WindowResizeListener} from '@liveauctioneers/react-window-resize-listener';
import {HomeCmp} from './app/layout/home.jsx';
import {SettingsCmp} from './app/layout/settings.jsx';
import {About} from './app/layout/about.jsx';
import {UpdatesCmp} from './app/layout/faq.jsx';
import {NotFound} from './app/layout/not-found.jsx';
import {SidebarCmp} from './app/components/side-bar.jsx';
import {textContent} from './config';
import {store} from './app/store';
import {formatTime, startUpdate, stopUpdate, isFinished} from './app/libs/timer';
import {stopAction} from './app/actions';
import './index.scss';

class H extends Component {
  constructor(props) {
    super(props);
    WindowResizeListener.DEBOUNCE_TIME = 200;
    this.update = this.forceUpdate.bind(this);
  }

  componentDidMount() {
    startUpdate(this.update);
  }

  componentWillUnmount() {
    stopUpdate(this.update);
  }

  componentDidUpdate() {
    const {dispatch, currentTimerLength, startTime} = this.props;
    if (isFinished({currentTimerLength, startTime})) {
      dispatch(stopAction(startTime));
    }
  }

  render() {
    const {settings, currentTimerLength, startTime} = this.props;
    const color = settings.find(el => el.name === 'Colors');
    return (
      <Helmet
        title={startTime ? formatTime({currentTimerLength, startTime}) : textContent}
        meta={[
          {name: 'description', content: textContent},
          {name: 'application-name', content: textContent},
          {name: 'msapplication-TileColor', content: color},
          {name: 'theme-color', content: color},
          {name: 'msapplication-navbutton-color', content: color},
          {name: 'apple-mobile-web-app-status-bar-style', content: color}
        ]}
        />
    );
  }
}
const mapStateToProps2 = store => {
  const {settings} = store.settingsReducer;
  const {currentTimerLength, startTime} = store.timerReducer;
  return {currentTimerLength, startTime, settings};
};

H.propTypes = {
  startTime: React.PropTypes.number.isRequired,
  currentTimerLength: React.PropTypes.number.isRequired,
  settings: React.PropTypes.array.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

const Hd = connect(mapStateToProps2)(H);

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {isSideBarOpen: false};
    this.handleChecked = this.handleChecked.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleSwipeRight = this.handleSwipeRight.bind(this);
    this.handleSwipeLeft = this.handleSwipeLeft.bind(this);
  }

  handleResize(windowSize) {
    this.setState({isSideBarOpen: windowSize.windowWidth > 900});
  }

  handleSwipeRight() {
    this.setState({isSideBarOpen: true});
  }

  handleSwipeLeft() {
    this.setState({isSideBarOpen: false});
  }

  handleChecked() {
    this.setState({isSideBarOpen: !this.state.isSideBarOpen});
  }

  render() {
    // const {settings, currentTimerLength, startTime} = this.props;
    // const color = settings[0].value;
    return (
      <main>
        <Hd/>
        <WindowResizeListener onResize={this.handleResize}/>
        <Router>
          <div>
            <input type="checkbox" id="nav-trigger" checked={this.state.isSideBarOpen} onChange={this.handleChecked} className="nav-trigger"/>
            <label htmlFor="nav-trigger">
              <div id="close-icon"><span></span><span></span><span></span></div>
            </label>
            <Swipe
              className="swipe-container"
              onSwipeRight={this.handleSwipeRight}
              onSwipeLeft={this.handleSwipeLeft}
              >
              <Route path="/" component={SidebarCmp}/>
              <Switch>
                <Route exact path="/" component={HomeCmp}/>
                <Route exact path="/settings" component={SettingsCmp}/>
                <Route exact path="/about" component={About}/>
                <Route exact path="/faq" component={UpdatesCmp}/>
                <Route component={NotFound}/>
              </Switch>
            </Swipe>
          </div>
        </Router>
      </main>
    );
  }
}

const mapStateToProps = store => {
  const {settings} = store.settingsReducer;
  const {currentTimerLength, startTime} = store.timerReducer;
  return {currentTimerLength, startTime, name, settings};
};

Main.propTypes = {
  startTime: React.PropTypes.number.isRequired,
  currentTimerLength: React.PropTypes.number.isRequired,
  settings: React.PropTypes.array.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

const App = connect(mapStateToProps)(Main);

render(
  <Provider store={store}><App/></Provider>,
  document.getElementById('app')
);
