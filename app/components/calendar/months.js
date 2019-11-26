import React from 'react';
import store, {set_calendar_date, set_active_month} from '../../store/store.js';

class Months extends React.Component {
    constructor (props) {
        super (props);
        this.state = store.getState();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick (evt) {
        var new_month = evt.target.value;
        var new_date = {...this.state.calendar.calendar_date};
        new_date.month = new_month;
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
            <div id="months">
                {
                    this.state.calendar.months.map((month, i) => {
                        return <button name="month" key={i} value={i} onClick={this.handleClick}> {month} </button>
                    })
                }
            </div>
        )
    }
}

export default Months;