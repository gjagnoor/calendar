import React from 'react';
import store, {add_completed_note, delete_note} from '../../store/store.js';

class Active_Notes extends React.Component {
    constructor (props) {
        super (props);
        this.state = store.getState();
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }

    handleChange (evt) {
        var note_index = evt.target.value;
        console.log(note_index);
        // add note to completed_notes
        var date = this.state.calendar.calendar_date.join("_");
        var note = this.state.notes.active_notes[date][note_index];
        console.log(note);
        store.dispatch(add_completed_note(note, note_index, date));
        
        // delete note from active notes
        var active_notes = this.state.notes.active_notes[date].slice(0);
        active_notes.splice(note_index, 1);
        store.dispatch(delete_note(active_notes, date));
        evt.preventDefault();
    }

    handleClick(evt) {
        var date = this.state.calendar.calendar_date.join("_");
        var active_notes = this.state.notes.active_notes[date].slice(0);
        active_notes.splice(evt.target.value,1);
        store.dispatch(delete_note(active_notes, date))
        evt.preventDefault();
    }

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        var date = this.state.calendar.calendar_date.join("_")
        return (
            <div id = "notes">
                {                            
                    this.state.notes.active_notes[date] ? this.state.notes.active_notes[date].map((note, i)=> {
                        return (
                            <div id ="task" key={i}>
                                <div>
                                    <button name="delete-button" value={i} onClick={this.handleClick}>
                                        X
                                    </button>
                                </div>
                                <div>
                                    {note}
                                </div>
                                <div>
                                    <input name="completed" type="checkbox" value={i} onChange={this.handleChange} /> 
                                </div>
                            </div>
                        )
                    }) : (
                        <div> 
                            <p> Nothing today. You sure you're not forgetting something? </p>
                        </div>
                    )
                }
            </div>
        )
    }
}

export default Active_Notes;