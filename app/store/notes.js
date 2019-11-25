// reorganize state

// initial state 
var initialState = {
    note_to_add: '',
    active_notes: {
        "2019_11_25" : ["note 25-1", "note 25-2"],
        "2019_11_26" : ["note 26-1"]
    },
    completed_notes: {
        "2019_11_25" : ["note 25-3", "note 25-4"],
        "2019_11_26" : ["note 26-2"]
    }
}

// action types 
const WRITE_NOTE = 'WRITE_NOTE';
const ADD_NOTE = 'ADD_NOTE';
const DELETE_NOTE = 'DELETE_NOTE';

const ADD_COMPLETED_NOTE = 'ADD_COMPLETED_NOTE';

/*
 - checkbox checks
    - index of note is sent to click handler. click handler finds the note in active_notes, passes it, todays date, and its index to add_completed_note action creator.
    action creator returns an action with the note, date, and i. 
        - if reducer can find date - adds it to the array at the same index? 
        - if reducer can't find the date - creates a new date key and adds it at the same index?
    - action creator deletes note from active notes (replaces that index with null??? so other tasks index does not get impacted?)
- checkbox unchecks
    - index of note is sent to click handler. click handler finds the note in completed_notes, passes it, todays date, and its index to add_note action creator.
    action creator returns an action with the note, date, and i. 
        - if reducer can find date - adds it to the array at the same index? 
        - if reducer can't find the date - creates a new date key and adds it at the same index?
    - action creator deletes note from completed_notes (replaces that index with null??? so other tasks index does not get impacted?)

    does it matter? which index the note has in either array? if yes, why?
*/

// action creators
export function write_note (note) {
    const action = { type: WRITE_NOTE, note };
    return action;
}

export function add_note (note_to_add, date) {
    const action = { type: ADD_NOTE, note_to_add, date };
    return action;
}

export function delete_note (active_notes, date) {
    const action = { type: DELETE_NOTE, active_notes, date };
    return action;
}

export function add_completed_note (note, i, date) {
    console.log(note, i, date);
    const action = { type: ADD_COMPLETED_NOTE, note, i, date };
    return action;
}

// reducer
export default function notes (state = initialState, action) {
    console.log('inside notes store.js:::', state);
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
                    [action.date]: [...action.active_notes]
                }
            }
        case 'ADD_COMPLETED_NOTE':
            if(state.completed_notes[action.date]) { 
                return {
                    ...state,
                    completed_notes: {
                        ...state.completed_notes,
                        [action.date]: [...state.completed_notes[action.date], action.note]
                    }
                }
            } else {
                return {
                    ...state,
                    completed_notes: {
                        ...state.completed_notes,
                        [action.date]: [action.note]
                    }
                }
            }
        default: 
            return state;
    }
} 