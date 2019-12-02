import React from 'react';
import {connect} from 'react-redux';

class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        const { calendar_date} = this.props;
        var date = new Date (calendar_date);
        date = date.toDateString();
        return (
            <div className='snuggle-fit text-align-center' id="date-rendering">
                {date}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        calendar_date: state.calendar.calendar_date
    }
}

export default connect(mapStateToProps) (Header);