import React from 'react';
import store from '../../store/store.js';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = store.getState();
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => this.setState(store.getState()));
    }

    componentWillUnmount () {
        this.unsubscribe();
    }

    render () {
        var date = new Date (this.state.calendar.calendar_date);
        date = date.toDateString();
        return (
            <div className='snuggle-fit text-align-center' id="date-rendering">
                {date}
            </div>
        )
    }
}

export default Header;