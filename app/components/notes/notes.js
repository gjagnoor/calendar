import React from 'react';
import Note_Form from './note-form.js';
import Active_Notes from './active-notes.js';
import Completed_Notes from './completed_notes.js';
import Header from './header.js';


class Notes extends React.Component {

    constructor (props) {
        super (props);
    }

    render () {
        return (
            <div id="container-1">

                <div>
                    <Header />
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