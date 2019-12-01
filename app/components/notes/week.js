import React from 'react';
import { set_calendar_date, update_note } from '../../store/store.js';
import {connect} from 'react-redux';

class Week extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <div className="flex-row-center">
                {
                    this.props.week.map((day, i) => {
                        return (
                            <div key={i} className="snuggle-fit" id={day} onDrop={this.props.handleDrop} onDragOver={this.props.handleAllowDrop}>
                                <div className="weekday">
                                    {day.split(" ")[0]}
                                </div>
                                {/* date prints with a space on one line when logged */}
                                <div className = "weekdate" id={day} onClick={this.props.handleClick}>
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

const mapStateToProps = (state) => {
    return {
        week: state.calendar.week
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleClick (evt) {
            var date_selected = evt.target.id;
            return dispatch(set_calendar_date(date_selected));
        },   
        handleDrop (evt) {
            var move_to_date = evt.target.id;
            evt.preventDefault();
            var note_id = evt.dataTransfer.getData("id");
            return dispatch(update_note(note_id, "due_date", move_to_date));
        },    
        handleAllowDrop (evt) {
            evt.preventDefault();
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Week);