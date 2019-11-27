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
        var date = Object.values(this.state.calendar.calendar_date).join('_');
        console.log('state logging from completed_notes::::', this.state)
        return (
            <div>
                {
                    this.state.completed_notes.notes[date] ? this.state.completed_notes.notes[date].map((note, i) => {
                        return (
                            <div key={i}>
                                {note}
                            </div>
                        )
                    }) : (null)
                }
            </div>
        )
    }
}

export default Completed_Notes;