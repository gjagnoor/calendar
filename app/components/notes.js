import React from 'react';
import store, {write_note, add_note} from '../store.js';


class Notes extends React.Component {

    constructor (props) {
        super (props);
        this.state = store.getState();
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange (evt) {
        var note = evt.target.value;
        store.dispatch(write_note(note));

        evt.preventDefault();
    }
 
    handleSubmit(evt) {
        var date_clicked = [this.state.year, this.state.month, this.state.date_num].join("_");
        store.dispatch(add_note(this.state.note_to_add, date_clicked));
        store.dispatch(write_note(""));

        evt.preventDefault();
    }

    componentWillMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render () {
        console.log(this.state.note_to_add);
        var date = [this.state.year, this.state.month, this.state.date_num].join("_")
        return (
            <div id="container-1">
                <div id="container-1-1">
                    <div id="date">
                        <div>
                            <h1>{this.state.months[this.state.month]}</h1>
                        </div>
                        <div>
                            <h1>{this.state.date_num}</h1>
                        </div>
                        <div>
                            <h1>{this.state.year}</h1>
                        </div>
                    </div>

                    <div id = "notes-form">
                        <form onSubmit={this.handleSubmit}>
                            <input name="note" type="text" value={this.state.note_to_add} onChange={this.handleChange} />
                            <input id = "submit-button" name="submit" type="submit" value="+" />
                        </form>
                    </div>

                    <div id = "notes">
                            {                            
                                this.state.notes[date] ? this.state.notes[date].map((note, i)=> {
                                    return (
                                        <div id ="task" key={i}>
                                            <div>
                                                <button>
                                                    X
                                                </button>
                                            </div>
                                            <div>
                                                {note}
                                            </div>
                                            <div>
                                                <input type="checkbox" />
                                            </div>
                                        </div>
                                    )
                                }) : (<div> <p> Nothing today. You sure you're not forgetting something? </p></div>)
                            }
                    </div>
                </div>
            </div>
        )
    }
}

export default Notes;