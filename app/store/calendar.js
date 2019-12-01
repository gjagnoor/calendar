import {datestring, toiso, next_7_days} from './helpers/date_transformers.js';

// reorganize state
/*
*/

// initial state 
var initialState = {
    calendar_date: datestring(Date.now()),
    week: next_7_days(datestring(Date.now()))
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
                calendar_date: action.date,
                week: next_7_days(datestring(action.date))
            }
        default: 
            return state;
    }
} 