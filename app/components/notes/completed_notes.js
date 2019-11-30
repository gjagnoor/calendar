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
        evt.target.checked === false && evt.target.name === 'incomplete' ? store.dispatch(update_note(note_id, 'incomplete')) : (null);
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
            <div className="snuggle-fit">
                {
                    completed_notes_on_date ? completed_notes_on_date.map((note, i) => {
                        return (
                            <div className='flex-row-left snuggle-fit complete' key={i}>
                                <div className="note-name snuggle-fit">
                                    {note.name}
                                </div>
                                <div className="flex-row-center complete-note-actions">
                                    <div>
                                        <input className='checkbox' name = "incomplete" type="checkbox" value={note.id} onChange = {this.handleChange} checked/>
                                    </div>
                                    <div>
                                        <button className="fas fa-trash-alt delete-note" name="delete-button" value={note.id} onClick={this.handleClick}></button>
                                    </div>
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