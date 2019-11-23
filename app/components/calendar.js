import React from 'react';
import generate_active_month_data from '../helpers/generate_active_month.js';
  
  class Calendar extends React.Component {
    
    constructor (props) {
      super (props);
      this.state = {
        weekdays : ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"],
        months: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
        year: 2019,
        month: 10,
        active_month: []
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleClick = this.handleClick.bind(this);
    }

    handleChange (evt) {
      console.log(evt.target.value)
      var date = new Date(evt.target.value, this.state.month, 1);
      var active_month = generate_active_month_data(date);
      this.setState({
        [evt.target.name] : evt.target.value,
        active_month
      })
      evt.preventDefault();
    }

    handleClick (evt) {
      var month = this.state.months.indexOf(evt.target.value);
      var date = new Date(this.state.year, month, 1);
      var active_month = generate_active_month_data(date);
      this.setState({
        [evt.target.name]: month,
        active_month
      })
      evt.preventDefault();
    }
    
    componentWillMount () {
      var today = new Date();
      var active_month = generate_active_month_data(today)
     
      this.setState({
          year: today.getFullYear(),
          month: today.getMonth(), 
          active_month: active_month
      })
      
    }
    
    render () {
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
                return <button name="month" key={i} value={month} onClick={this.handleClick}> {month} </button>
              })
            }
          </div>
          
          <div id="calendar">
            <div>
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
                                      return <td key={i}> {day} </td>
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
  