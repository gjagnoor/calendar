import generate_active_month_data from './helpers/generate_active_month.js';

// reorganize state
/*
*/

// initial state 
var initialState = {
    weekdays : ["Sun", "Mon","Tue","Wed","Thurs","Fri","Sat"],
    months: [null, "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"], // date object in JS has months from from 1...12
    calendar_date: {
        year: 2019,
        month: 11,
        date_num: 25
    },
    active_month: []
}

// action types 
const SET_CALENDAR_DATE = 'SET_CALENDAR_DATE';
const SET_ACTIVE_MONTH = 'SET_ACTIVE_MONTH';

// action creators
export function set_calendar_date (date) {
    const action = { type: SET_CALENDAR_DATE, date };
    return action;
}

export function set_active_month (date) {
    var active_month = generate_active_month_data(date);
    const action = {type : SET_ACTIVE_MONTH, active_month};
    return action;
}

// reducer
export default function calendar (state = initialState, action) {
    switch (action.type) {
        case 'SET_CALENDAR_DATE': 
            return {
                ...state,
                calendar_date: action.date
            }
        case 'SET_ACTIVE_MONTH':
            return {
                ...state,
                active_month: action.active_month
            }
        default: 
            return state;
    }
} 