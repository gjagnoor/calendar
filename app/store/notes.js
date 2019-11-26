import delete_active_note from './helpers/delete_active_note';
// reorganize state
/*
*/

// initial state 
var initialState = {
    note_to_add: '',
    active_notes: {
        "2019_10_23" : ["note 23-1", "note 23-2"],
        "2019_10_24" : ["note 24-1"]
    }
}

// action types 
const WRITE_NOTE = 'WRITE_NOTE';
const ADD_NOTE = 'ADD_NOTE';
const DELETE_NOTE = 'DELETE_NOTE';

// action creators
export function write_note (note) {
    const action = {type: WRITE_NOTE, note};
    return action;
}

export function add_note (note_to_add, date) {
    const action = {type: ADD_NOTE, note_to_add, date};
    return action;
}

export function delete_note (i, active_notes, date) {
    var [notes_after_deletion, transformed_date] = delete_active_note(i, active_notes, date);
    const action = {type: DELETE_NOTE, notes_after_deletion, transformed_date};
    return action;
}

// reducer
export default function notes (state = initialState, action) {
    switch (action.type) {
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
                    [action.transformed_date]: [...action.notes_after_deletion]
                }
            }
        default: 
            return state;
    }
} 