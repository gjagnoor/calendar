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
        var date_clicked = Object.values(this.state.calendar.calendar_date).join("_");
        store.dispatch(add_note(this.state.active_notes.note_to_add, date_clicked));
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
                    <input name="note" type="text" value={this.state.active_notes.note_to_add} onChange={this.handleChange} />
                    <input id = "submit-button" name="submit" type="submit" value="+" />
                </form>
            </div>
        )
    }
}

export default Note_Form;