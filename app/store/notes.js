
// reorganize state
/*
*/

// initial state 
var initialState = {
    note_to_add: '',
    notes: [
        {
            id: 1, 
            name: 'note-26-1', 
            date: '2019_11_26',
            completed: false
        },
        {
            id: 2, 
            name: 'note-25-1', 
            date: '2019_11_25',
            completed: false
        },
        {
            id: 3, 
            name: 'note-26-2', 
            date: '2019_11_26',
            completed: false
        },
        {
            id: 4,
            name: 'note-26-3',
            date: '2019_11_26',
            completed: true
        },
        {
            id: 5, 
            name: 'note-25-2', 
            date: '2019_11_25',
            completed: false
        }
    ]
}

// action types 
const WRITE_NOTE = 'WRITE_NOTE';
const ADD_NOTE = 'ADD_NOTE';
const DELETE_NOTE = 'DELETE_NOTE';
const MARK_NOTE_COMPLETE = 'MARK_NOTE_COMPLETE';
const MARK_NOTE_INCOMPLETE = 'MARK_NOTE_INCOMPLETE';

// action creators
export function write_note (note) {
    const action = {type: WRITE_NOTE, note};
    return action;
}

export function add_note (new_note) {
    const action = {type: ADD_NOTE, new_note};
    return action;
}

export function delete_note (note_id) {
    const action = {type: DELETE_NOTE, note_id};
    return action;
}

export function mark_note_complete(note_id) {
    const action = { type: MARK_NOTE_COMPLETE, note_id};
    return action;
}

export function mark_note_incomplete (note_id) {
    const action = { type: MARK_NOTE_INCOMPLETE, note_id};
    return action;
}

// reducer
export default function tasks (state = initialState, action) {
    switch (action.type) {
        case 'WRITE_NOTE':
            return {
                ...state,
                note_to_add: action.note
            }
        case 'ADD_NOTE':
            return {
                ...state,
                notes: [
                    ...state.notes,
                    action.new_note
                ]
            }         
        case 'DELETE_NOTE':
            return {
                ...state,
                notes: state.notes.filter((note) => note.id !== Number(action.note_id))
            }
        case 'MARK_NOTE_COMPLETE':
            return {
                ...state,
                notes: state.notes.map((note) => {
                    if (note.id === Number(action.note_id)) {
                        note.completed = true
                    }
                    return note;
                })
            }
        case 'MARK_NOTE_INCOMPLETE': 
            return {
                ...state, 
                notes: state.notes.map((note) => {
                    if (note.id === Number(action.note_id)) {
                        note.completed = false
                    }
                    return note;
                })
            } 
        default: 
            return state;
    }
} 