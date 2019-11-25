import React from 'react';
import store from '../../store/store.js';

class Date extends React.Component {
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
        console.log(this.state);
        return (
            <div id="date">
                <div>
                    <h1>{this.state.calendar.months[this.state.calendar.calendar_date[1]]}</h1>
                </div>
                <div>
                    <h1>{this.state.calendar.calendar_date[2]}</h1>
                </div>
                <div>
                    <h1>{this.state.calendar.calendar_date[0]}</h1>
                </div>
            </div>
        )
    }
}

export default Date;