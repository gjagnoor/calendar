import React from 'react';
import store, { set_calendar_date } from '../../store/store.js';

class Week extends React.Component {
    constructor (props) {
        super(props);
        this.state = store.getState();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick (evt) {
        var date_selected = evt.target.id;
        store.dispatch(set_calendar_date(date_selected));
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => store.getState());
    }

    componentWillUnmount() {
        this.unsubscribe();
    }
    render () {
        console.log(this.state.calendar.week)
        return (
            <div className="flex-row-center">
                {
                    this.state.calendar.week.map((day, i) => {
                        return (
                            <div key={i} className="snuggle-fit">
                                <div>
                                    {day.split(" ")[0]}
                                </div>
                                {/* date prints with a space on one line when logged */}
                                <div id={day} onClick={this.handleClick}>
                                    {day.split(" ").slice(1,3).join(" ")}
                                </div>
                            </div>
                        )
                    })                   
                }
            </div>
        )
    }
}

export default Week;