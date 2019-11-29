import React from 'react';
import store, {delete_note, update_note} from '../../store/store.js';

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
        if (evt.target.checked === true && evt.target.name === 'completed') {
            store.dispatch(update_note(note_id, 'completed', null));
        } else {
            store.dispatch(delete_note(note_id))
        }
        evt.preventDefault();
    }

    handleOnDrag (evt) {
        console.log('Im innnn', evt.target.id)
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
        var notes_on_date = this.state.tasks.notes.filter((note) => note.due_date === current_date && note.completed === false);
        var notes_on_another_date = this.state.tasks.notes.filter((note) => {
            if (!note.completed) {
                var today = new Date(this.state.calendar.calendar_date);
                today = today.valueOf();
                var due_date = new Date(note.due_date);
                due_date = due_date.valueOf();
                if (today < due_date) {
                    return note;
                }
            }
        });
        return (
            <div className='flex-column-left snuggle-fit border-bottom'>
                <div>
                    {                            
                        notes_on_date ? notes_on_date.map((note, i)=> {
                            return (
                                <div key = {i} className ="flex-row-left note snuggle-fit" id={note.id} draggable="true" onDragStart={this.handleOnDrag}>
                                    <i className="fas fa-bars"></i>
                                    <div>
                                        <button name="delete-button" value={note.id} onClick={this.handleClick}>
                                            -
                                        </button>
                                    </div>
                                    <div id="note-name">
                                        <input id={note.id} name='name' type="text" value={note.name} onChange={this.handleChange} />
                                    </div>
                                    <div>
                                        <input className='checkbox' name = "completed" type="checkbox" value={note.id} onClick={this.handleClick} />
                                    </div>
                                </div>
                            )
                        }) : (null)
                    }
                </div>
                <div>
                    {
                        notes_on_another_date ? notes_on_another_date.map((note, i) => {
                            return (<div key={i} className ="flex-row-left note snuggle-fit due-another-day" id={note.id}>
                                    <div>
                                        <button name="delete-button" value={note.id} onClick={this.handleClick} >
                                            -
                                        </button>
                                    </div>

                                    <div>
                                        <input id={note.id} name='name' type="text" value={note.name} onChange={this.handleChange} />
                                    </div>

                                    <div>
                                        <input className='checkbox' name = "completed" type="checkbox" value={note.id} onClick={this.handleClick} />
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