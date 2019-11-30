// Wow! This is something you can do with webpack!
// As long as we have the style-loader plugin (and a few other tools),
// we can import scss and webpack will build it out into css!
// Don't worry too much about how this happens for now - but you can feel
// free to write any scss you want now!
import './styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import Notes from './components/notes/notes.js';
import Date from './components/date.js';

// to import store and connect it to the main component so child components can have access to state?

class Main extends React.Component {

  render () {
    return (
      <div className='flex-row-center snuggle-fit dev-mode' id='container-0'>

        <div className='flex-column-center snuggle-fit' id="container-0-2">
          <Notes />
        </div>

      </div>

    );
  }
}

ReactDOM.render(
  <Main />,
  document.getElementById('app')
);
