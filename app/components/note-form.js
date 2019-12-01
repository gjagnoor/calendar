import React from 'react';
import store, {write_note, add_note, set_calendar_date} from '../store/store.js';
import {datestring, toiso} from '../store/helpers/date_transformers.js';
import {reset_note_to_add} from '../store/helpers/notes.js';

class Note_Form extends React.Component {
    constructor (props) {
        super (props);
        this.state = store.getState();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (evt) {
        // generate note data
        var new_note = {...this.state.tasks.note_to_add};
        new_note.id = this.state.tasks.notes[this.state.tasks.notes.length-1]['id'] + 1;
        new_note = {
            ...new_note,
            [evt.target.name] : evt.target.name === 'due_date' ? datestring(evt.target.value) : evt.target.value // this is correct 
        }
        store.dispatch(write_note(new_note));
    }
 
    handleSubmit(evt) {
        // add note 
        store.dispatch(add_note(this.state.tasks.note_to_add));
        store.dispatch(set_calendar_date(this.state.tasks.note_to_add.due_date));
        // reset write note 
        store.dispatch(write_note(reset_note_to_add()));
        evt.preventDefault();
    }

    componentWillMount () {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));  
    }
  
    componentWillUnMount() {
        this.unsubscribe();
    }

    render () {
        var due_date_iso_format = toiso(this.state.tasks.note_to_add.due_date).split('T')[0]; 
        console.log('state from note-form-component', this.state);
        return (
            <div id="note-form">
                <form className='flex-row-center' onSubmit={this.handleSubmit}>
                    <div className='snuggle-fit'>
                        <input name="name" type="text" value={this.state.tasks.note_to_add.name} onChange={this.handleChange} />
                    </div>
                    {/* convert date to iso format before passing it to value field */}
                    <div className='snuggle-fit'>
                        <input name="due_date" type="date" value = {due_date_iso_format} onChange={this.handleChange} />
                    </div>
                    <div id = "note-submit" className="snuggle-fit">
                        <input name="submit" type="submit" value="+" />
                    </div>
                </form>
            </div>
        )
    }
}

export default Note_Form;