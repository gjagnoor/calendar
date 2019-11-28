import React from 'react';
import store, {delete_note, update_note} from '../../store/store.js';

class Active_Notes extends React.Component {
    constructor (props) {
        super (props);
        this.state = store.getState();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(evt) {
        var note_id = evt.target.value;
        if (evt.target.checked === true && evt.target.name === 'completed') {
            store.dispatch(update_note(note_id, 'completed'));
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
        var current_date = this.state.calendar.calendar_date;
        console.log(this.state);
        var notes_on_date = this.state.tasks.notes.filter((note) => note.due_date === current_date && note.completed === false);
        console.log(this.state)
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
                                    <input className='checkbox' name = "completed" type="checkbox" value={note.id} onClick={this.handleClick} />
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