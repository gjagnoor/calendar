import React from 'react';
import store from '../../store/store.js';
import {filter_for_active_notes} from '../../store/helpers/notes.js';
import {generate_pdf} from '../../store/helpers/pdf.js';

class Actions extends React.Component {
    constructor (props) {
        super (props);
        this.state = store.getState();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick () {
        var todays_date = this.state.calendar.calendar_date;
        var notes = filter_for_active_notes(this.state.tasks.notes, todays_date);       
        generate_pdf(notes, todays_date);
    }

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render () {
        return (
            <div className="flex-row-right snuggle-fit">
                <div className="fas fa-download" onClick = {this.handleClick}></div>
            </div>
        )
    }
}

export default Actions;