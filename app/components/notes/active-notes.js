import React from 'react';
import store, {delete_note, mark_note_complete} from '../../store/store.js';

class Active_Notes extends React.Component {
    constructor (props) {
        super (props);
        this.state = store.getState();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(evt) {
        var note_id = evt.target.value;
        if (evt.target.checked === true && evt.target.name === 'marked_complete') {
            store.dispatch(mark_note_complete(note_id));
        } else {
            store.dispatch(delete_note(note_id))
        }
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
        return (
            <div id = "notes">
                {                            
                    notes_on_date ? notes_on_date.map((note, i)=> {
                        return (
                            <div className ="task" key={i}>
                                <div>
                                    <button name="delete-button" value={note.id} onClick={this.handleClick}>
                                        X
                                    </button>
                                </div>
                                <div>
                                    {note.name}
                                </div>
                                <div>
                                    <input name = "marked_complete" type="checkbox" value={note.id} onClick={this.handleClick} />
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