import { createStore } from 'redux';
import generate_active_month_data from './helpers/generate_active_month.js';

// reorganize state
/*
*/

// initial state 
var initialState = {
    weekdays : ["Sun", "Mon","Tue","Wed","Thurs","Fri","Sat"],
    months: [null, "Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"], // date object in JS has months from from 1...12
    calendar_date: [2019, 11, 23], // [year, month, date]
    active_month: [],
    note_to_add: '',
    active_notes: {
        "2019_10_23" : ["note 23-1", "note 23-2"],
        "2019_10_24" : ["note 24-1"]
    }
}

// action types 
const SET_CALENDAR_DATE = 'SET_CALENDAR_DATE';
const SET_ACTIVE_MONTH = 'SET_ACTIVE_MONTH';
const WRITE_NOTE = 'WRITE_NOTE';
const ADD_NOTE = 'ADD_NOTE';
const DELETE_NOTE = 'DELETE_NOTE';

// action creators
export function set_calendar_date (date) {
    const action = { type: SET_CALENDAR_DATE, date };
    return action;
}

export function set_active_month (date) {
    console.log(date)
    var active_month = generate_active_month_data(date);
    const action = {type : SET_ACTIVE_MONTH, active_month};
    return action;
}

export function write_note (note) {
    const action = {type: WRITE_NOTE, note};
    return action;
}

export function add_note (note_to_add, date) {
    const action = {type: ADD_NOTE, note_to_add, date};
    return action;
}

export function delete_note (active_notes, date) {
    const action = {type: DELETE_NOTE, active_notes, date};
    return action;
}

// reducer
function reducer (state = initialState, action) {
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
        case 'WRITE_NOTE':
            return {
                ...state,
                note_to_add: action.note
            }
        case 'ADD_NOTE':
            if (state.active_notes[action.date]) {
                return {
                    ...state,
                    active_notes: {
                        ...state.active_notes,
                        [action.date]: [...state.active_notes[action.date], action.note_to_add]
                    }
                }
            } else {
                return {
                    ...state,
                    active_notes: {
                        ...state.active_notes,
                        [action.date]: [action.note_to_add]
                    }
                }
            }           
        case 'DELETE_NOTE':
            return {
                ...state,
                active_notes: {
                    ...state.active_notes,
                    [action.date]: [...action.active_notes]
                }
            }
        default: 
            return state;
    }
} 

// create store object 
const store = createStore(reducer);

// export store 
export default store;