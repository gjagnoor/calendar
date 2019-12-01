import {datestring, toiso} from './helpers/date_transformers.js';
import {reset_note_to_add} from './helpers/notes.js';

// reorganize state
/*
    dates should be stored in dateString format only? -- 
*/

// initial state 
var initialState = {
    note_to_add: reset_note_to_add(),
    notes: [
        {
            id: 1, 
            name: 'note-28-1', 
            due_date: datestring(Date.now()),
            completed: false
        },
        {
            id: 2, 
            name: 'note-28-2', 
            due_date: datestring(Date.now()),
            completed: false
        },
        {
            id: 3, 
            name: 'note-28-3', 
            due_date: datestring(Date.now()),
            completed: false
        },
        {
            id: 4,
            name: 'note-28-4',
            due_date: datestring(Date.now()),
            completed: true
        },
        {
            id: 5, 
            name: 'note-28-5', 
            due_date: datestring(Date.now()),
            completed: false
        }
    ]
}

// action types 
const WRITE_NOTE = 'WRITE_NOTE';
const ADD_NOTE = 'ADD_NOTE';
const DELETE_NOTE = 'DELETE_NOTE';
const UPDATE_NOTE = 'UPDATE_NOTE';

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

export function update_note (id, key, data) {
    const action = { type: UPDATE_NOTE, id, key, data};
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
        case 'UPDATE_NOTE':
            return {
                ...state,
                notes: state.notes.map((note) => {
                  if (note.id === Number(action.id)) {
                    if (action.key === 'complete') {
                        note.completed = true;
                    } else if (action.key === 'incomplete') {
                        note.completed = false;
                    } else if (action.key === 'name') {
                        note.name = action.data;
                    } else if (action.key === 'due_date') {
                        note.due_date = action.data;
                    }
                    return note;
                  } else {
                      return note;
                  }
                })
            }
        default: 
            return state;
    }
} 