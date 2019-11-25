import React from 'react';
import store, {add_completed_note, delete_note} from '../../store/store.js'

class Completed_Notes extends React.Component {
    constructor(props) {
        super (props);
        this.state = store.getState();
    }

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    render () {
        var date = this.state.calendar.calendar_date.join("_");
        return (
            <div>
                {
                    this.state.notes.completed_notes[date] ? this.state.notes.completed_notes[date].map((note, i) => {
                        return (
                            <div key = {i}>
                                <div id="completed-note">
                                    {note}
                                </div>
                                <div>
                                    <input name="completed" type="checkbox" value={i} checked /> 
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

