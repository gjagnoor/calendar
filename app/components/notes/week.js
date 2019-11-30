import React from 'react';
import store, { set_calendar_date, update_note } from '../../store/store.js';
import { ECONNABORTED } from 'constants';

class Week extends React.Component {
    constructor (props) {
        super(props);
        this.state = store.getState();
        this.handleClick = this.handleClick.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
    }

    handleClick (evt) {
        var date_selected = evt.target.id;
        store.dispatch(set_calendar_date(date_selected));
    }

    handleDrop (evt) {
        var move_to_date = evt.target.id;
        evt.preventDefault();
        var note_id = evt.dataTransfer.getData("id");
        store.dispatch(update_note(note_id, "due_date", move_to_date));
    }

    handleAllowDrop (evt) {
        evt.preventDefault();
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => store.getState());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
    render () {
        console.log(this.state.calendar.week)
        return (
            <div className="flex-row-center">
                {
                    this.state.calendar.week.map((day, i) => {
                        return (
                            <div key={i} className="snuggle-fit" id={day} onDrop={this.handleDrop} onDragOver={this.handleAllowDrop}>
                                <div className="weekday">
                                    {day.split(" ")[0]}
                                </div>
                                {/* date prints with a space on one line when logged */}
                                <div className = "weekdate" id={day} onClick={this.handleClick}>
                                    {day.split(" ").slice(1,3).join(" ")}
                                </div>
                            </div>
                        )
                    })                   
                }
            </div>
        )
    }
}

export default Week;