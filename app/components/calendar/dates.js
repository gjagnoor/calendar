import React from 'react';
import store, {set_calendar_date, set_active_month} from '../../store/store.js';

class Dates extends React.Component {
    constructor (props) {
        super (props);
        this.state = store.getState();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick (evt) {
        var new_date_num = evt.target.value;
        var new_date = {...this.state.calendar.calendar_date};
        new_date.date_num = new_date_num;     
        store.dispatch(set_calendar_date(new_date));
        store.dispatch(set_active_month(new_date));
        evt.preventDefault();
    }

    componentWillMount () {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));  
        store.dispatch(set_active_month(this.state.calendar.calendar_date));          
    }
  
    componentWillUnMount() {
        this.unsubscribe();
    }

    render () {
        return (
            <div id="calendar">
                <div id="calendar-table">
                    <table>
                        <tbody>
                            <tr>
                                {
                                    this.state.calendar.weekdays.map((weekday, i) => {
                                        return <th key={i}> {weekday} </th>
                                    })             
                                }
                            </tr>

                            {
                                this.state.calendar.active_month.map((week, i) => {
                                    return (<tr key={i}>
                                        {
                                            week.map((day, i) => { 
                                                return (<td key={i}> 
                                                    <button name="day" value={day} onClick = {this.handleClick}>
                                                        {day} 
                                                    </button>
                                                </td>)
                                            })
                                        }
                                    </tr>)
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Dates;