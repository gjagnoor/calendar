import React from 'react';
import store from '../../store/store.js';

class Completed_Notes extends React.Component {
    constructor (props) {
        super (props);
        this.state = store.getState();
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
                            <div key={i}>
                                {note.name}
                            </div>
                        )
                    }) : (null)
                }
            </div>
        )
    }
}

export default Completed_Notes;