import React from 'react';
import store, {write_note, add_note, set_calendar_date} from '../../store/store.js';
import todays_date from '../../store/helpers/todays_date.js';

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
        var notes = [...this.state.tasks.notes];
        new_note.id = notes.slice().pop().id + 1;
        evt.target.name === 'date' ? new_note.due_date = evt.target.value : new_note.due_date = this.state.calendar.calendar_date;
        evt.target.name === 'note' ? new_note.name = evt.target.value : new_note.name = new_note.name; 
        new_note.completed = false;
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
            due_date: todays_date(),
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
        return (
            <div>
                <form id="form" onSubmit={this.handleSubmit}>
                    <div id="note_field">
                        <input name="note" type="text" value={this.state.tasks.note_to_add.name} onChange={this.handleChange} />
                    </div>
                    <div id="date_field">
                        <input name="date" type="date" value = {this.state.tasks.note_to_add.due_date} onChange={this.handleChange} />
                    </div>
                    <div id="submit_button">
                        <input name="submit" type="submit" value="+" />
                    </div>
                </form>
            </div>
        )
    }
}

export default Note_Form;