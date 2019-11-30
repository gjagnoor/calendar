import React from 'react';
import store, {delete_note, update_note} from '../../store/store.js';
import {filter_for_active_notes, due_date_in_future} from '../../store/helpers/notes.js';

class Active_Notes extends React.Component {
    constructor (props) {
        super (props);
        this.state = store.getState();
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleOnDrag = this.handleOnDrag.bind(this);
    }

    handleChange (evt) {
        var update_to_name = evt.target.value;
        var note_id = evt.target.id;
        store.dispatch(update_note(note_id, 'name', update_to_name));
    }

    handleClick(evt) {
        var note_id = evt.target.value;
        evt.target.checked === true && evt.target.name === 'completed' ? store.dispatch(update_note(note_id, 'completed', null)) : (null);
        evt.target.name === 'delete-active-note' ? store.dispatch(delete_note(note_id)) : (null);
        evt.preventDefault();
    }

    handleOnDrag (evt) {
        evt.dataTransfer.setData("id", evt.target.id);
    }

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        var current_date = this.state.calendar.calendar_date;
        var notes_on_calendar_date_and_futuredate = filter_for_active_notes(this.state.tasks.notes, current_date);
        return (
            <div className='flex-column-left snuggle-fit border-bottom'>
                <div>
                    {                            
                        notes_on_calendar_date_and_futuredate ? notes_on_calendar_date_and_futuredate.map((note, i)=> {
                            var class_val = '';
                            due_date_in_future(current_date, note.due_date) ? class_val = "flex-row-left note snuggle-fit due-another-day" : class_val = "flex-row-left note snuggle-fit";
                            return (
                                <div key = {i} className ={class_val} id={note.id} draggable="true" onDragStart={this.handleOnDrag}>
                                    <div id="note-name">
                                        <input id={note.id} name='name' type="text" value={note.name} onChange={this.handleChange} />
                                    </div>
                                    <div>
                                        <input className='checkbox' name = "completed" type="checkbox" value={note.id} onClick={this.handleClick} />
                                    </div>
                                    <div className="flex-row-right">
                                        <div>
                                            <button className="fas fa-trash-alt delete-note" name="delete-active-note" value={note.id} onClick={this.handleClick}>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : (null)
                    }
                </div>
            </div>
        )
    }
}

export default Active_Notes;