import React from 'react';
import store from '../../store/store.js';
import Calendar_Header from './calendar-header.js';
import Months from './months.js';
import Dates from './dates.js';
  
  class Calendar extends React.Component {
    
    constructor (props) {
      super (props);
      this.state = store.getState();
    }

    componentWillMount () {
      this.unsubscribe = store.subscribe(() => this.setState(store.getState()));  
    }

    componentWillUnMount() {
        this.unsubscribe();
    }
 
    render () {
       return (
        <div id="container-2">
          
          <div>            
            <Calendar_Header />
          </div>

          <div>
            <Months />            
          </div>
          
          <div>
            <Dates />
          </div>
          
        </div>
      )
    }
  }
  
export default Calendar;
  