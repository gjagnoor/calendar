import React from 'react';
import { set_calendar_date, update_note, set_next_week, set_last_week } from '../store/store.js';
import {connect} from 'react-redux';

class Week extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        const {handleClick, handleAllowDrop, handleDrop, first_day, last_day, week} = this.props;
        console.log('here', this.props.week.slice().pop())
        return (
            <div className="flex-row-center">
                <div id={first_day} onClick={handleClick} className="last-week arrows fas fa-angle-left"></div>
                {
                    week.map((day, i) => {
                        return (
                            <div key={i} className="snuggle-fit" id={day} onDrop={handleDrop} onDragOver={handleAllowDrop}>
                                <div className="weekday">
                                    {day.split(" ")[0]}
                                </div>
                                {/* date prints with a space on one line when logged */}
                                <div className = "weekdate" id={day} onClick={handleClick}>
                                    {day.split(" ").slice(1,3).join(" ")}
                                </div>
                            </div>
                        )
                    })                   
                }
                <div className="next-week arrows fas fa-angle-right" id={last_day} onClick={handleClick}></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        week: state.calendar.week,
        last_day: state.calendar.week.slice().pop(),
        first_day: state.calendar.week.slice().shift()
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleClick (evt) {
            console.log('here here', evt.target.id)
            evt.target.className.slice(0,10).trim() === 'last-week' ? dispatch(set_last_week(evt.target.id)) : (null);
            evt.target.className.slice(0,10).trim() === 'next-week' ? dispatch(set_next_week(evt.target.id)) : (null);
            evt.target.className === 'weekdate' ? dispatch(set_calendar_date(evt.target.id)) : (null);
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