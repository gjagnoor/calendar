// Wow! This is something you can do with webpack!
// As long as we have the style-loader plugin (and a few other tools),
// we can import scss and webpack will build it out into css!
// Don't worry too much about how this happens for now - but you can feel
// free to write any scss you want now!
import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

class Main extends React.Component {

  render () {
    return (
      <h1>Hello React!</h1>
    );
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('app')
);
