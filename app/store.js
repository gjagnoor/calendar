import { createStore } from 'redux';
import generate_active_month_data from './helpers/generate_active_month.js';

// reorganize state
/*
var initialState = {
    weekdays : ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"],
    months: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
    user_data: {
        id: 7,
        form_data: { // while not a form but a selecting a button, etc can be included in form data???
            note_to_add: "",
            calendar_year: 2019,
            selected_date: [2019, 10, 23, 6], // [year, month, date, day]
            selected_calendar_month_data: [], // 5 weeks
        },
        notes: [
            {
                id: 1
                note: "note 23-1",
                date: "2019_10_23",
                completed: false
            }, 
            {
                id: 2
                note: "note 23-2",
                date: "2019_10_23",
                completed: true
            }, 
            {
                id: 3
                note: "note 24-1",
                date: "2019_10_24",
                completed: false
            }
        ]
    }
}
*/ 

// initial state 
var initialState = {
    weekdays : ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"],
    months: ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],
    year: 2019,
    month: 10,
    date_num: 23,
    active_month: [],
    note_to_add: '',
    notes: {
        "2019_10_23" : ["note 23-1", "note 23-2"],
        "2019_10_24" : ["note 24-1"]
    }
}

// action types 
const SET_YEAR = 'SET_YEAR';
const SET_ACTIVE_MONTH = 'SET_ACTIVE_MONTH';
const SET_MONTH = 'SET_MONTH';
const WRITE_NOTE = 'WRITE_NOTE';
const ADD_NOTE = 'ADD_NOTE';
const SET_DATE_NUM = 'SET_DATE_NUM';
const DELETE_NOTE = 'DELETE_NOTE';

// action creators
export function set_year (year) {
    const action = { type: SET_YEAR, year };
    return action;
}

export function set_active_month (date) {
    var active_month = generate_active_month_data(date);
    const action = {type : SET_ACTIVE_MONTH, active_month};
    return action;
}

export function set_month (month_index) {
    const action = {type: SET_MONTH, month_index};
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

export function set_date_num (num) {
    const action = {type: SET_DATE_NUM, num};
    return action;
}

export function delete_note (notes, date) {
    const action = {type: DELETE_NOTE, notes, date};
    return action;
}

// reducer
function reducer (state = initialState, action) {
    switch (action.type) {
        case 'SET_YEAR': 
            return {
                ...state,
                year: action.year
            }
        case 'SET_ACTIVE_MONTH':
            return {
                ...state,
                active_month: action.active_month
            }
        case 'SET_MONTH':
            return {
                ...state,
                month: action.month_index
            }
        case 'WRITE_NOTE':
            return {
                ...state,
                note_to_add: action.note
            }
        case 'ADD_NOTE':
            if (state.notes[action.date]) {
                return {
                    ...state,
                    notes: {
                        ...state.notes,
                        [action.date]: action.notes
                    }
                }
            } else {
                return {
                    ...state,
                    notes: {
                        ...state.notes,
                        [action.date]: [action.note_to_add]
                    }
                }
            }           
        case 'SET_DATE_NUM':
            return {
                ...state,
                date_num: action.num
            }
        case 'DELETE_NOTE':
            return {
                ...state,
                notes: {
                    ...state.notes,
                    [action.date]: [...action.notes]
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