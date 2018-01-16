import React, {PureComponent} from 'react';

const posts = [{
  title: 'What problem solves timer.tomatoes.work?',
  body: 'This is online time tracker manager that can be used for Pomodoro',
  link: {
    href: 'http://google.com',
    content: 'find if here'
  }
}, {
  title: 'What is Pomodoro?',
  body: 'More information aout thehnique you can find in link below. Pomodoro Technique® and Pomodoro® are registered trademarks of Francesco Cirillo. ',
  link: {
    href: 'http://google.com',
    content: 'find if here'
  }
}];

export class Updates extends PureComponent {
  render() {
    return (
      <section id="posts" className="about site-wrap">
        <div className="menu-background">F.A.Q.</div>
        <div className="updates-wrapper">
        {posts.map((post, idx) => {
          return (
            <div
              className="description"
              key={idx}
              >
              <h1 id={idx}>{post.title}</h1>
              <p>
                {post.body}
              </p>
              <p>
                <a href={post.link.href}>{post.link.content}</a>
              </p>
            </div>
          );
        })}
        </div>
        <div id="mc_embed_signup">
          <form action="https://work.us17.list-manage.com/subscribe/post?u=4c4e91c0edee77f132280e279&amp;id=0d7c6c726e" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" className="validate" target="_blank" noValidate>
            <div id="mc_embed_signup_scroll">
              <div className="mc-field-group">
                <label htmlFor="mce-EMAIL">Email Address </label>
                <input type="email" value="" name="EMAIL" className="required email" id="mce-EMAIL"/>
              </div>
              <div id="mce-responses" className="clear">
                <div className="response" id="mce-error-response" style={{display: 'none'}}></div>
                <div className="response" id="mce-success-response" style={{display: 'none'}}></div>
              </div>
              <div style={{position: 'absolute', left: '-5000px'}} aria-hidden="true"><input type="text" name="b_4c4e91c0edee77f132280e279_0d7c6c726e" tabIndex="-1" value=""/></div>
              <div className="clear"><input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" className="button"/></div>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export const UpdatesCmp = Updates;

