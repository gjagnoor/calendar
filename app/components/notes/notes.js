import React from 'react';
import Actions from './actions.js';
import {connect} from 'react-redux';
import { filter_for_notes } from '../../store/helpers/notes.js';
import {update_note, delete_note} from '../../store/store.js';

class Notes extends React.Component {
    constructor (props) {
        super (props);
    }
    render () {
        const {next_3_days, tasks_today, tasks_tomorrow, tasks_day_after, handleChange, handleClick} = this.props
        var notes = [tasks_today, tasks_tomorrow, tasks_day_after]
        return (
            <div className="flex-row-center dev-mode notes-outer">
                {
                    notes ? notes.map((day, i) => {
                        return (
                            <div className="notes-card flex-column-center dev-mode" key={i}>
                                <div>
                                    {next_3_days[i]}
                                </div>                               
                                <div>
                                    {
                                        day ? day.map((note, j) => {
                                            console.log(note);
                                            return (
                                                <div className="note flex-row-center" key={j}>
                                                    <div>
                                                        <input id={note.id} name='name' type="text" value={note.name} onChange={handleChange} />
                                                    </div>
                                                    <div>
                                                        {
                                                            note.completed ? <input className='checkbox complete' name="complete" type="checkbox" value={note.id} onClick={handleClick} checked/> : (<input className='checkbox incomplete' name="incomplete" type="checkbox" value={note.id} onClick={handleClick} />)
                                                        }
                                                    </div>
                                                    <div>
                                                        <button className="fas fa-trash-alt delete-note" value={note.id} onClick={handleClick}></button>
                                                    </div>
                                                </div>
                                            )
                                        }): (null)
                                    }
                                </div>                           
                            </div>
                        )}): (null)
                }                  
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
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
            console.log(evt.target.id)
            var update_to_name = evt.target.value;
            var note_id = evt.target.id;
            dispatch(update_note(note_id, 'name', update_to_name)); 
        },
        handleClick (evt) {
            var note_id = evt.target.value;
            evt.target.checked === false && evt.target.name === 'incomplete' ? dispatch(update_note(note_id, 'incomplete')) : (null);
            evt.target.checked === true && evt.target.name === 'completed' ? dispatch(update_note(note_id, 'completed', null)) : (null);
            evt.target.name === 'delete-active-note' ? dispatch(delete_note(note_id)) : (null);
            evt.preventDefault();
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Notes);