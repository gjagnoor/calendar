import React from 'react';
import store, {set_calendar_date, set_active_month} from '../../store/store.js';

class Calendar_Header extends React.Component {
    constructor (props) {
        super (props);
        this.state = store.getState();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (evt) {
        var new_year = evt.target.value;
        var new_date = {...this.state.calendar.calendar_date}    
        new_date.year = new_year;
        store.dispatch(set_calendar_date(new_date));
        store.dispatch(set_active_month(new_date)); 
        evt.preventDefault();
    }

    componentWillMount () {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));  
    }
  
    componentWillUnMount() {
        this.unsubscribe();
    }

    render () {
        return (
            <div id="container-2-1">
                <div id="year">
                    <form>
                        <input name="year" type="number" value={this.state.calendar.calendar_date.year} onChange={this.handleChange} />
                    </form>
                </div>
                <div id="title">
                    Calendar
                </div>
            </div>
        )
    }
}

export default Calendar_Header;