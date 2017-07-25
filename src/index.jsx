import Offline from 'offline-plugin/runtime';
Offline.install();

// TODO: https://codelabs.developers.google.com/codelabs/add-to-home-screen/#5
// TODO: https://developer.chrome.com/multidevice/android/installtohomescreen
// TODO: https://mobiforge.com/design-development/taking-web-offline-service-workers

import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Provider, connect} from 'react-redux';
import Helmet from 'react-helmet';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import {HomeCmp} from './app/layout/home.jsx';
import {AboutCmp} from './app/layout/about.jsx';
import {SidebarCmp} from './app/components/side-bar.jsx';
import {textContent} from './config';
import {store} from './app/store';
import {formatDate, addToInterval, removeFromInterval} from './app/libs/timer';
import './index.scss';

class Main extends Component {
  constructor(props) {
    super(props);
    this.update = this.forceUpdate.bind(this);
  }

  componentDidMount() {
    addToInterval(this.update);
  }

  componentWillUnmount() {
    removeFromInterval(this.update);
  }

  render() {
    const {color, time, startTime, children} = this.props;
    const currentTime = formatDate(time, startTime);
    return (
      <main>
        <Helmet
          title={startTime ? currentTime : textContent}
          link={[
            {rel: 'apple-touch-icon-precomposed', href: 'static/apple-touch-icon-57x57.png', sizes: '57x57'},
            {rel: 'apple-touch-icon-precomposed', href: 'static/apple-touch-icon-114x114.png', sizes: '114x114'},
            {rel: 'apple-touch-icon-precomposed', href: 'static/apple-touch-icon-72x72.png', sizes: '72x72'},
            {rel: 'apple-touch-icon-precomposed', href: 'static/apple-touch-icon-144x144.png', sizes: '144x144'},
            {rel: 'apple-touch-icon-precomposed', href: 'static/apple-touch-icon-60x60.png', sizes: '60x60'},
            {rel: 'apple-touch-icon-precomposed', href: 'static/apple-touch-icon-120x120.png', sizes: '120x120'},
            {rel: 'apple-touch-icon-precomposed', href: 'static/apple-touch-icon-76x76.png', sizes: '76x76'},
            {rel: 'apple-touch-icon-precomposed', href: 'static/apple-touch-icon-152x152.png', sizes: '152x152'},
            {rel: 'icon', type: 'image/png', href: 'static/favicon-196x196.png', sizes: '196x196'},
            {rel: 'icon', type: 'image/png', href: 'static/favicon-96x96.png', sizes: '96x96'},
            {rel: 'icon', type: 'image/png', href: 'static/favicon-32x32.png', sizes: '32x32'},
            {rel: 'icon', type: 'image/png', href: 'static/favicon-16x16.png', sizes: '16x16'},
            {rel: 'icon', type: 'image/png', href: 'static/favicon-128.png', sizes: '128x128'}
          ]}
          meta={[
            {name: 'description', content: 'Just another tomatoes (pomodoro) timer'},
            {name: 'application-name', content: textContent},
            {name: 'apple-mobile-web-app-capable', content: 'yes'},
            {name: 'mobile-web-app-capable', content: 'yes'},
            {name: 'msapplication-TileImage', content: 'static/mstile-144x144.png'},
            {name: 'msapplication-square70x70logo', content: 'static/mstile-70x70.png'},
            {name: 'msapplication-square150x150logo', content: 'static/mstile-150x150.png'},
            {name: 'msapplication-wide310x150logo', content: 'static/mstile-310x150.png'},
            {name: 'msapplication-square310x310logo', content: 'static/mstile-310x310.png'},
            {name: 'msapplication-TileColor', content: color},
            {name: 'theme-color', content: color},
            {name: 'msapplication-navbutton-color', content: color},
            {name: 'apple-mobile-web-app-status-bar-style', content: color}
          ]}
          />
        <SidebarCmp/>
        <input type="checkbox" id="nav-trigger" className="nav-trigger"/>
        <label htmlFor="nav-trigger">
          <div id="close-icon"><span></span><span></span><span></span></div>
        </label>
        {children}
      </main>
    );
  }
}

const mapStateToProps = store => {
  const {color} = store.representationReducer;
  const {time, startTime} = store.timerReducer;
  return {color, time, startTime, name};
};

Main.propTypes = {
  startTime: React.PropTypes.number.isRequired,
  time: React.PropTypes.number.isRequired,
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
