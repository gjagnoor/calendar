import React from 'react';
import Note_Form from './note-form.js';
import Active_Notes from './active-notes.js';
import Completed_Notes from './completed_notes.js';
import Header from './header.js';
import Week from './week.js';

class Notes extends React.Component {

    constructor (props) {
        super (props);
    }

    render () {
        return (
            <div className='flex-column-center'>

                <div>
                    <Header />
                </div>

                <div id='notes-form'>
                    <Note_Form /> 
                </div>

                <div>
                    <Week />
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