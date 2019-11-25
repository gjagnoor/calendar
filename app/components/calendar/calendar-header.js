import React from 'react';
import store, {set_calendar_date, set_active_month} from '../../store/store.js';

class Calendar_Header extends React.Component {
    constructor (props) {
        super (props);
        this.state = store.getState();

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (evt) {
        var date = [evt.target.value, this.state.calendar.calendar_date[1], this.state.calendar.calendar_date[2]];
        
        store.dispatch(set_calendar_date(date));
        store.dispatch(set_active_month(date));
  
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
                        <input name="year" type="number" value={this.state.calendar.calendar_date[0]} onChange={this.handleChange} />
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