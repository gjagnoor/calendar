import React from 'react';
import { set_calendar_date, update_note, set_next_week, set_last_week } from '../store/store.js';
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
                                <div id={day} onClick={this.props.handleClick} className="last-week arrows fas fa-angle-left"></div>
                                <div className="weekday">
                                    {day.split(" ")[0]}
                                </div>
                                {/* date prints with a space on one line when logged */}
                                <div className = "weekdate" id={day} onClick={this.props.handleClick}>
                                    {day.split(" ").slice(1,3).join(" ")}
                                </div>
                                <div className="next-week arrows fas fa-angle-right" id={day} onClick={this.props.handleClick}></div>
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
            console.log(evt.target.className.slice(0,10))
            evt.target.className.slice(0,10).trim() === 'last-week' ? dispatch(set_last_week(evt.target.id)) : (null);
            evt.target.className.slice(0,10).trim() === 'next-week' ? dispatch(set_next_week(evt.target.id)) : (null);
            evt.target.className === 'weekdate' ? dispatch(set_calendar_date(evt.target.id)) : (null);
            // var date_selected = evt.target.id;
            // return dispatch(set_calendar_date(date_selected));
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