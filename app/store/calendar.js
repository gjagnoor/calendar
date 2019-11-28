import todays_date from './helpers/todays_date.js';

// reorganize state
/*
*/

// initial state 
var initialState = {
    calendar_date: todays_date()
}

// action types 
const SET_CALENDAR_DATE = 'SET_CALENDAR_DATE';

// action creators
export function set_calendar_date (date) {
    const action = { type: SET_CALENDAR_DATE, date };
    return action;
}

// reducer
export default function calendar (state = initialState, action) {
    switch (action.type) {
        case 'SET_CALENDAR_DATE': 
            return {
                ...state,
                calendar_date: action.date || todays_date()
            }
        default: 
            return state;
    }
} 