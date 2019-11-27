import React from 'react';
import store, {delete_note, add_to_complete} from '../../store/store.js';

class Active_Notes extends React.Component {
    constructor (props) {
        super (props);
        this.state = store.getState();
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        // var note_index = evt.target.value;
        // var transformed_date = Object.values(this.state.calendar.calendar_date).join('_');
        // var note = this.state.active_notes.notes[transformed_date][note_index];
        // store.dispatch(add_to_complete(note, transformed_date));
    }

    handleClick(evt) {
        var note_id = evt.target.value;
        store.dispatch(delete_note(note_id))
        evt.preventDefault();
    }

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        var current_date = Object.values(this.state.calendar.calendar_date).join("_")
        var notes_on_date = this.state.tasks.notes.filter((note) => note.date === current_date && note.completed === false);
        console.log(notes_on_date);
        return (
            <div id = "notes">
                {                            
                    notes_on_date ? notes_on_date.map((note, i)=> {
                        return (
                            <div id ="task" key={i}>
                                <div>
                                    <button name="delete-button" value={note.id} onClick={this.handleClick}>
                                        X
                                    </button>
                                </div>
                                <div>
                                    {note.name}
                                </div>
                                <div>
                                    <input type="checkbox" value={note.id} onChange={this.handleChange} />
                                </div>
                            </div>
                        )
                    }) : (null)
                }
            </div>
        )
    }
}

export default Active_Notes;