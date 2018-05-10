import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

function DemoPage() {
  return (
    <div styleName="demo-page">
      <h1>Welcome Page</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pulvinar
        urna vitae consectetur congue. Praesent malesuada consequat diam, non
        consectetur libero eleifend at.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pulvinar
        urna vitae consectetur congue. Praesent malesuada consequat diam, non
        consectetur libero eleifend at.
      </p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pulvinar
        urna vitae consectetur congue. Praesent malesuada consequat diam, non
        consectetur libero eleifend at.
      </p>
      <p>
        Go to <Link to="app">App section</Link>
      </p>
      <p>
        Go to <Link to="apollo">Apollo section</Link>
      </p>
    </div>
  );
}

export default DemoPage;
