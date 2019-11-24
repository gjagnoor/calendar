import React from 'react';
import store, {set_year, set_active_month, set_month, set_date_num} from '../store.js';
  
  class Calendar extends React.Component {
    
    constructor (props) {
      super (props);

      this.state = store.getState();

      this.handleChange = this.handleChange.bind(this);
      this.handleClick_month = this.handleClick_month.bind(this);
      this.handleClick_num = this.handleClick_num.bind(this);
    }

    handleChange (evt) {
      var date = new Date(evt.target.value, this.state.month, 1);

      store.dispatch(set_year(evt.target.value));
      store.dispatch(set_active_month(date));

      evt.preventDefault();
    }

    handleClick_month (evt) {
      var month_index = this.state.months.indexOf(evt.target.value);
      var date = new Date(this.state.year, month_index, 1);
      store.dispatch(set_month(month_index));
      store.dispatch(set_active_month(date));
      evt.preventDefault();
    }

    handleClick_num (evt) {
      store.dispatch(set_date_num(evt.target.value));
      evt.preventDefault();
    }
    
    componentWillMount () {
      this.unsubscribe = store.subscribe(() => this.setState(store.getState()));

      var today = new Date();
      store.dispatch(set_year(today.getFullYear()));
      store.dispatch(set_month(today.getMonth()));
      store.dispatch(set_active_month(today));
      
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
                <input name="year" type="number" value={this.state.year} onChange={this.handleChange} />
              </form>
            </div>

            <div id="title">
              Calendar
            </div>

          </div>

          <div id="months">
            {
              this.state.months.map((month, i) => {
                return <button name="month" key={i} value={month} onClick={this.handleClick_month}> {month} </button>
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
                                        <button name="day" value={day} onClick = {this.handleClick_num}>
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
  