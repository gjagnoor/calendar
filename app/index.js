// Wow! This is something you can do with webpack!
// As long as we have the style-loader plugin (and a few other tools),
// we can import scss and webpack will build it out into css!
// Don't worry too much about how this happens for now - but you can feel
// free to write any scss you want now!
import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import Calendar from './components/calendar.js';
import Notes from './components/notes.js';
import store from './store/store.js';

// to import store and connect it to the main component so child components can have access to state?

class Main extends React.Component {

  render () {
    return (
      <div id="container-0">
        <div id="container-0-1">
          <Notes />
        </div>
        
        <div id="container-0-2">
          <Calendar />
        </div>
      </div>

    );
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('app')
);
