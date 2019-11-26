import React from 'react';
import Date from './date.js';
import Note_Form from './note-form.js';
import Active_Notes from './active-notes.js';
import Completed_Notes from './completed_notes.js';


class Notes extends React.Component {

    constructor (props) {
        super (props);
    }

    render () {
        return (
            <div id="container-1">

                <div>
                    <Date />
                </div>

                <div>
                    <Note_Form /> 
                </div>

                <div>
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