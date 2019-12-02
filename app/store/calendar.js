import {datestring, toiso, next_7_days, last_7_days} from './helpers/date_transformers.js';

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
const SET_NEXT_WEEK = 'SET_NEXT_WEEK';
const SET_LAST_WEEK = 'SET_LAST_WEEK';

// action creators
export function set_calendar_date (date) {
    const action = { type: SET_CALENDAR_DATE, date };
    return action;
}

export function set_next_week (first_day) {
    console.log(first_day)
    const action = { type: SET_NEXT_WEEK, first_day};
    return action;
}

export function set_last_week (last_day) {
    console.log(last_day)
    const action = { type: SET_LAST_WEEK, last_day};
    return action;
}

// reducer
export default function calendar (state = initialState, action) {
    switch (action.type) {
        case 'SET_CALENDAR_DATE': 
            return {
                ...state,
                calendar_date: action.date,
                week: next_7_days(action.date)
            }
        case 'SET_NEXT_WEEK': 
            return {
                ...state,
                week: next_7_days(action.first_day),
                calendar_date: action.first_day
            }
        case 'SET_LAST_WEEK':
            return {
                ...state,
                week: last_7_days(action.last_day)
            }
        default: 
            return state;
    }
} 