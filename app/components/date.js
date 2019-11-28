import React from 'react';
import store, {set_calendar_date} from '../store/store.js';

class Date extends React.Component {
    constructor (props) {
        super (props);
        this.state = store.getState();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange (evt) {
        store.dispatch(set_calendar_date(evt.target.value));        
    }

    componentWillMount () {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));  
    }
  
    componentWillUnMount() {
        this.unsubscribe();
    }

    render () {
        return (
            <div id="date">
                <div>
                    <input name="date" type="date" value={this.state.calendar.calendar_date} onChange = {this.handleChange} />
                </div>
            </div>
        )
    }
}

export default Date;