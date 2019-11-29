import React from 'react';
import store, {write_note, add_note, set_calendar_date} from '../../store/store.js';
import {datestring, toiso} from '../../store/helpers/date_transformers.js';

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
        evt.target.name === 'due_date' ? console.log('incoming iso due date and date string due date:::', typeof(evt.target.value), datestring(evt.target.value)): null;
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
        store.dispatch(write_note({
            id: 0,
            name: 'please add a task for the day',
            due_date: datestring(Date.now()),
            completed: false
        }));

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
        console.log(this.state);
        return (
            <div>
                <form className='flex-row-center' onSubmit={this.handleSubmit}>
                    <div className='snuggle-fit'>
                        <input name="name" type="text" value={this.state.tasks.note_to_add.name} onChange={this.handleChange} />
                    </div>
                    {/* convert date to iso format before passing it to value field */}
                    <div className='snuggle-fit'>
                        <input name="due_date" type="date" value = {due_date_iso_format} onChange={this.handleChange} />
                    </div>
                    <div className='snuggle-fit'>
                        <input name="submit" type="submit" value="+" />
                    </div>
                </form>
            </div>
        )
    }
}

export default Note_Form;