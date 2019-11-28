import todays_date from './helpers/todays_date.js';
// reorganize state
/*
*/

// initial state 
var initialState = {
    note_to_add: {
        id: 0,
        name: 'please add a task for the day',
        due_date: todays_date(),
        completed: false
    },
    notes: [
        {
            id: 1, 
            name: 'note-28-1', 
            due_date: '2019-11-28',
            completed: false
        },
        {
            id: 2, 
            name: 'note-25-1', 
            due_date: '2019-11-25',
            completed: false
        },
        {
            id: 3, 
            name: 'note-28-2', 
            due_date: '2019-11-28',
            completed: false
        },
        {
            id: 4,
            name: 'note-28-3',
            due_date: '2019-11-28',
            completed: true
        },
        {
            id: 5, 
            name: 'note-25-2', 
            due_date: '2019-11-25',
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