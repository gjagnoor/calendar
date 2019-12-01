import React from 'react';
import Active_Notes from './active-notes.js';
import Completed_Notes from './completed_notes.js';
import Actions from './actions.js';
import {connect} from 'react-redux';
import { filter_for_active_notes } from '../../store/helpers/notes.js';

class Notes extends React.Component {
    constructor (props) {
        super (props);
    }
    render () {
        const {next_3_days, tasks_today, tasks_tomorrow, tasks_day_after} = this.props;
        var notes = [tasks_today, tasks_tomorrow, tasks_day_after];
        return (
            <div className="flex-row-center">
                {
                    notes.map((day, i) => {
                        return (
                            <div className="notes-card flex-column-center">
                                <div>
                                    {next_3_days[i]}
                                </div>
                                
                                <div>
                                    {
                                        day.map((note) => {
                                            return (
                                                <div className="note flex-row-center">
                                                    <div className="fas fa-bar"></div>
                                                    <div>
                                                        {note.name}
                                                    </div>
                                                    <div>
                                                        {
                                                            note.completed ? <input className='checkbox' type="checkbox" value={note.id} onClick={handleClick} checked/> : <input className='checkbox' type="checkbox" value={note.id} onClick={handleClick} />
                                                        }
                                                    </div>
                                                    <div>
                                                        <button className="fas fa-trash-alt" value={note.id} onClick={handleClick}></button>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>                           
                            )
                        })
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
        next_3_days: state.calendar.week.slice(0,4),
        tasks_today: filter_for_notes(all_notes, todays_date), // returns active and inactive notes 
        tasks_tomorrow: filter_for_notes(all_notes, state.calendar.week.slice(1,2)),
        tasks_day_after: filter_for_notes(all_notes, state.calendar.week.slice(2,3))
    }
}

export default connect(mapStateToProps) (Notes);