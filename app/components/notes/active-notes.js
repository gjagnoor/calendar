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
        var note_index = evt.target.value;
        var transformed_date = Object.values(this.state.calendar.calendar_date).join('_');
        var note = this.state.active_notes.notes[transformed_date][note_index];
        store.dispatch(add_to_complete(note, transformed_date));
    }

    handleClick(evt) {
        store.dispatch(delete_note(evt.target.value, this.state.active_notes.notes, this.state.calendar.calendar_date))
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
        return (
            <div id = "notes">
                {                            
                    this.state.active_notes.notes[current_date] ? this.state.active_notes.notes[current_date].map((note, i)=> {
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
                                    <input type="checkbox" value={i} onChange={this.handleChange} />
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