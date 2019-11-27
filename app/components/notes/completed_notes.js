import React from 'react';
import store, {mark_note_incomplete} from '../../store/store.js';

class Completed_Notes extends React.Component {
    constructor (props) {
        super (props);
        this.state = store.getState();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (evt) {
        var note_id = evt.target.value;
        if (evt.target.checked === false) {
            store.dispatch(mark_note_incomplete(note_id));
        }
    }

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render () {
        var transformed_current_date = Object.values(this.state.calendar.calendar_date).join('_');
        var completed_notes_on_date = this.state.tasks.notes.filter((note) => note.date === transformed_current_date && note.completed === true);
        return (
            <div>
                {
                    completed_notes_on_date ? completed_notes_on_date.map((note, i) => {
                        return (
                            <div className='task incomplete' key={i}>
                                
                                <div>
                                    {note.name}
                                </div>
                                <div>
                                    <input name = "marked_complete" type="checkbox" value={note.id} onChange = {this.handleChange} checked/>
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