import React, {PureComponent} from 'react';
import {Link} from 'react-router-dom';

export class NotFound extends PureComponent {
  render() {
    return (
      <section className="timer site-wrap" style={{backgroundColor: '#333131'}}>
        <div className="container">
          <div id="countdown">404</div>
          <Link to="/"><button className="button">BACK</button></Link>
        </div>
      </section>
    );
  }
}
