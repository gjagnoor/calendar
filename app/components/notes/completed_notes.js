import React from 'react';
import store, {delete_note, update_note} from '../../store/store.js';

class Completed_Notes extends React.Component {
    constructor (props) {
        super (props);
        this.state = store.getState();
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange (evt) {
        var note_id = evt.target.value;
        if (evt.target.checked === false && evt.target.name === 'incomplete') {
            store.dispatch(update_note(note_id, 'incomplete'));
        }
    }

    handleClick (evt) {
        var note_id = evt.target.value;
        store.dispatch(delete_note(note_id));
        evt.preventDefault();
    }

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render () {
        var current_date = this.state.calendar.calendar_date;
        var completed_notes_on_date = this.state.tasks.notes.filter((note) => note.due_date === current_date && note.completed === true);
        return (
            <div>
                {
                    completed_notes_on_date ? completed_notes_on_date.map((note, i) => {
                        return (
                            <div className='task complete' key={i}>
                                <div>
                                    <button name="delete-button" value={note.id} onClick={this.handleClick}>
                                        X
                                    </button>
                                </div>
                                <div>
                                    {note.name}
                                </div>
                                <div>
                                    <input className='checkbox' name = "incomplete" type="checkbox" value={note.id} onChange = {this.handleChange} checked/>
                                </div>
                            </div>
                        )
                    }) : (null)
                }
            </div>
        )
    }
}

export default Completed_Notes;