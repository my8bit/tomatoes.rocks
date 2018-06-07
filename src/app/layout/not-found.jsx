import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';
import Helmet from 'react-helmet';
import {URL} from '../libs/common.js';

export class NotFound extends PureComponent {
  render() {
    return (
      <section className="timer site-wrap" style={{backgroundColor: '#333131'}}>
        <Helmet
          link={[{rel: 'canonical', href: `${URL}${encodeURI(window.location.pathname)}`}]}
          title="Not found 404"
          />
        <div className="menu-background dark">
          <h1>Not found 404</h1>
        </div>
        <div className="container">
          <div id="countdown">404</div>
          <Link to="/"><button className="button">BACK</button></Link>
        </div>
      </section>
    );
  }
}
