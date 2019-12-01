import React from 'react';
import Actions from './actions.js';
import {connect} from 'react-redux';
import { filter_for_notes, due_date_in_future } from '../../store/helpers/notes.js';
import {update_note, delete_note} from '../../store/store.js';

class Notes extends React.Component {
    constructor (props) {
        super (props);
    }
    render () {
        const {today, next_3_days, tasks_today, tasks_tomorrow, tasks_day_after, handleChange, handleClick, handleOnDrag} = this.props
        var notes = [tasks_today, tasks_tomorrow, tasks_day_after]
        return (
            <div className="flex-row-center-wrap notes-outer">
                {
                    notes ? notes.map((day, i) => {
                        return (
                            <div className="notes-card flex-column-center" key={i}>
                                <div className="card-date text-center">
                                    {next_3_days[i]}
                                </div>                               
                                <div className="notes snuggle-fit">
                                    {
                                        day ? day.map((note, j) => {
                                            var checkbox_classname = note.completed ? "complete" : "incomplete";
                                            var future_classname = '';
                                            due_date_in_future(next_3_days[i], note.due_date) ? future_classname = "note snuggle-fit flex-row-left due-another-day" : future_classname = "note snuggle-fit flex-row-left";
                                            return (
                                                <div className={future_classname} key={j} id={note.id} draggable="true" onDragStart={handleOnDrag}>
                                                    <div className="text-field">
                                                        <input className={checkbox_classname} id={note.id} name='name' type="text" value={note.name} onChange={handleChange} />
                                                    </div>
                                                    <div>
                                                        <input className='complete' name="complete" type="checkbox" value={note.id} onClick={handleClick} checked={note.completed}/> 
                                                    </div>
                                                    <div>
                                                        <button className="fas fa-trash-alt delete-note" name="delete-note" value={note.id} onClick={handleClick}></button>
                                                    </div>
                                                </div>
                                            )
                                        }): (null)
                                    }
                                </div>                           
                            </div>
                        )
                    }): (null)
                }                  
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        today: state.calendar.calendar_date,
        next_3_days: state.calendar.week.slice(0,4),
        tasks_today: filter_for_notes(state.tasks.notes, state.calendar.week.slice(0,1)), // returns active and inactive notes 
        tasks_tomorrow: filter_for_notes(state.tasks.notes, state.calendar.week.slice(1,2)),
        tasks_day_after: filter_for_notes(state.tasks.notes, state.calendar.week.slice(2,3))
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleChange (evt) {
            // updating note namec
            var update_to_name = evt.target.value;
            var note_id = evt.target.id;
            dispatch(update_note(note_id, 'name', update_to_name)); 
        },
        handleClick (evt) {
            var note_id = evt.target.value;
            evt.target.name === 'delete-note' ? dispatch(delete_note(note_id)) : (null);
            evt.target.checked === true ? dispatch(update_note(note_id, 'complete', null)) : (null);
            evt.target.checked === false ? dispatch(update_note(note_id, 'incomplete', null)) : (null);
        },
        handleOnDrag (evt) {
            evt.dataTransfer.setData("id", evt.target.id);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Notes);