import React from 'react';
import store, {set_active_month, set_calendar_date} from '../store.js';
  
  class Calendar extends React.Component {
    
    constructor (props) {
      super (props);

      this.state = store.getState();

      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }

    handleChange (evt) {
      var date = [evt.target.value, this.state.calendar_date[1], this.state.calendar_date[2]];
      
      store.dispatch(set_calendar_date(date));
      store.dispatch(set_active_month(date));

      evt.preventDefault();
    }

    handleClick (evt) {

      if (evt.target.name === 'month') {
        var date = [this.state.calendar_date[0], evt.target.value, this.state.calendar_date[2]];
      } else {
        var date = [this.state.calendar_date[0], this.state.calendar_date[1], evt.target.value];
      }
      
      store.dispatch(set_calendar_date(date));
      store.dispatch(set_active_month(date));
      evt.preventDefault();
    }
    
    componentWillMount () {

      this.unsubscribe = store.subscribe(() => this.setState(store.getState()));  
      store.dispatch(set_active_month(this.state.calendar_date));
        
    }

    componentWillUnMount() {
      this.unsubscribe();
    }
    
    render () {
      console.log('calendar state', this.state);
      return (
        <div id="container-2">
          
          <div id="container-2-1">
            
            <div id="year">
              <form>
                <input name="year" type="number" value={this.state.calendar_date[0]} onChange={this.handleChange} />
              </form>
            </div>

            <div id="title">
              Calendar
            </div>

          </div>

          <div id="months">
            {
              this.state.months.map((month, i) => {
                return <button name="month" key={i} value={i} onClick={this.handleClick}> {month} </button>
              })
            }
          </div>
          
          <div id="calendar">
            <div id="calendar-table">
              <table>
                  <tbody>
                      <tr>
                          {
                            this.state.weekdays.map((weekday, i) => {
                                return <th key={i}> {weekday} </th>
                            })             
                          }
                      </tr>
                      
                      {
                        this.state.active_month.map((week, i) => {
                            return (<tr key={i}>
                                {
                                  week.map((day, i) => { 
                                      return <td key={i}> 
                                        <button name="day" value={day} onClick = {this.handleClick}>
                                        {day} 
                                        </button>
                                      </td>
                                  })
                                }
                            </tr>)
                        })
                      }
                </tbody>
              </table>
            </div>
          </div>
          
        </div>
      )
    }
  }
  
export default Calendar;
  