import React from 'react';
import store, {write_note, add_note} from '../../store/store.js';

class Note_Form extends React.Component {
    constructor (props) {
        super (props);
        this.state = store.getState();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (evt) {
        var note = evt.target.value;
        store.dispatch(write_note(note));
        evt.preventDefault();
    }
 
    handleSubmit(evt) {
        // generate note data
        var id = this.state.tasks.notes.slice().pop().id + 1
        var date_clicked = Object.values(this.state.calendar.calendar_date).join("_");
        var name = this.state.tasks.note_to_add;
        var completed = false;
        var note = {id, date: date_clicked, name, completed};

        // add note 
        store.dispatch(add_note(note));
        store.dispatch(write_note(""));
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
            <div id="notes-form">
                <form onSubmit={this.handleSubmit}>
                    <input name="note" type="text" value={this.state.tasks.note_to_add} onChange={this.handleChange} />
                    <input id = "submit-button" name="submit" type="submit" value="+" />
                </form>
            </div>
        )
    }
}

export default Note_Form;