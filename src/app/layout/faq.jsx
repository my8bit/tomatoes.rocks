import React, {PureComponent} from 'react';

const posts = [{
  title: 'one header',
  body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  link: {
    href: 'http://google.com',
    content: 'find if here'
  }
}, {
  title: 'two header',
  body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  link: {
    href: 'http://google.com',
    content: 'find if here'
  }
}, {
  title: 'one header',
  body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  link: {
    href: 'http://google.com',
    content: 'find if here'
  }
}, {
  title: 'one header',
  body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  link: {
    href: 'http://google.com',
    content: 'find if here'
  }
}, {
  title: 'one header',
  body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  link: {
    href: 'http://google.com',
    content: 'find if here'
  }
}, {
  title: 'one header',
  body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  link: {
    href: 'http://google.com',
    content: 'find if here'
  }
}, {
  title: 'one header',
  body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  link: {
    href: 'http://google.com',
    content: 'find if here'
  }
}, {
  title: 'one header',
  body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
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

