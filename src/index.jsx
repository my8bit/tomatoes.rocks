import Offline from 'offline-plugin/runtime';
Offline.install();

// TODO: https://codelabs.developers.google.com/codelabs/add-to-home-screen/#5
// TODO: https://developer.chrome.com/multidevice/android/installtohomescreen
// TODO: https://mobiforge.com/design-development/taking-web-offline-service-workers
import Swipe from 'react-easy-swipe';

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import Helmet from 'react-helmet';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {WindowResizeListener} from 'react-window-resize-listener';
import {HomeCmp} from './app/layout/home.jsx';
import {AboutCmp} from './app/layout/about.jsx';
import {SidebarCmp} from './app/components/side-bar.jsx';
import {textContent} from './config';
import {store} from './app/store';
import {formatTime, startUpdate, stopUpdate} from './app/libs/timer';
import './index.scss';

WindowResizeListener.DEBOUNCE_TIME = 200;
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {isSideBarOpen: false};
    this.handleChecked = this.handleChecked.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.handleSwipeRight = this.handleSwipeRight.bind(this);
    this.handleSwipeLeft = this.handleSwipeLeft.bind(this);
    this.update = this.forceUpdate.bind(this);
  }

  componentDidMount() {
    startUpdate(this.update);
  }

  componentWillUnmount() {
    stopUpdate(this.update);
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
    const {color, currentTimerLength, startTime, children} = this.props;
    return (
      <main>
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
        <SidebarCmp/>
        <WindowResizeListener onResize={this.handleResize}/>
        <input aria-label="open menu" type="checkbox" id="nav-trigger" checked={this.state.isSideBarOpen} onChange={this.handleChecked} className="nav-trigger"/>
        <label htmlFor="nav-trigger">
          <div id="close-icon"><span></span><span></span><span></span></div>
        </label>
        <Swipe
          className="swipe-container"
          onSwipeRight={this.handleSwipeRight}
          onSwipeLeft={this.handleSwipeLeft}
          >
          {children}
        </Swipe>
      </main>
    );
  }
}

const mapStateToProps = store => {
  const {color} = store.representationReducer;
  const {currentTimerLength, startTime} = store.timerReducer;
  return {color, currentTimerLength, startTime, name};
};

Main.propTypes = {
  startTime: React.PropTypes.number.isRequired,
  currentTimerLength: React.PropTypes.number.isRequired,
  color: React.PropTypes.string.isRequired,
  children: React.PropTypes.element.isRequired,
  dispatch: React.PropTypes.func.isRequired
};

const App = connect(mapStateToProps)(Main);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <section>
        <Route path="/" component={App}>
          <IndexRoute component={HomeCmp}/>
          <Route path="/settings" component={AboutCmp}/>
        </Route>
      </section>
    </Router>
  </Provider>,
  document.getElementById('app')
);
