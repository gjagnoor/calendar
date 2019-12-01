import React from 'react';
import Active_Notes from './active-notes.js';
import Completed_Notes from './completed_notes.js';
import Actions from './actions.js';

class Notes extends React.Component {

    constructor (props) {
        super (props);
    }

    render () {
        return (
            <div>

                <div className="snuggle-fit">
                    <Actions />
                </div>

                <div id="active-notes">
                    <Active_Notes />
                </div>

                <div>
                    <Completed_Notes />
                </div>
                    
            </div>
        )
    }
}

export default Notes;