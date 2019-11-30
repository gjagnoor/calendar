import React from 'react';
import {connect} from 'react-redux';
import store, {delete_note, update_note} from '../../store/store.js';

class Completed_Notes extends React.Component {
    constructor (props) {
        super (props);
    }

    render () {
        return (
            <div className="snuggle-fit">
                {
                    this.props.completed_notes_on_date ? this.props.completed_notes_on_date.map((note, i) => {
                        return (
                            <div className='flex-row-left snuggle-fit complete' key={i}>
                                <div className="note-name snuggle-fit">
                                    {note.name}
                                </div>
                                <div className="flex-row-center complete-note-actions">
                                    <div>
                                        <input className='checkbox' name = "incomplete" type="checkbox" value={note.id} onChange = {this.props.handleChange} checked/>
                                    </div>
                                    <div>
                                        <button className="fas fa-trash-alt delete-note" name="delete-button" value={note.id} onClick={this.props.handleClick}></button>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : (null)
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        current_date: state.calendar.calendar_date,
        completed_notes_on_date: state.tasks.notes.filter((note) => note.due_date === state.calendar.calendar_date && note.completed === true)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleChange (evt) {
            var note_id = evt.target.value;
            evt.target.checked === false && evt.target.name === 'incomplete' ? dispatch(update_note(note_id, 'incomplete')) : (null);
        },    
        handleClick (evt) {
            var note_id = evt.target.value;
            dispatch(delete_note(note_id));
            evt.preventDefault();
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Completed_Notes);