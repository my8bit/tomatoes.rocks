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
      </section>
    );
  }
}

export const UpdatesCmp = Updates;

