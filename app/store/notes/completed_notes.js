// initial state
export var initialState = {
    notes: {
        '2019_11_25': ['note 25-3', 'note 25-4'],
        '2019_11_24': ['note 24-1']
    }
}

// action types 
const ADD_TO_COMPLETE = 'ADD_TO_COMPLETE';

// action creators 
export function add_to_complete(note, transformed_date) {
    const action = { type: ADD_TO_COMPLETE, note, transformed_date};
    return action;
}

// reducer 
export default function completed_notes (state = initialState, action) {
    switch(action.type) {
        case 'ADD_TO_COMPLETE':
                if (state.notes[action.transformed_date]) {
                    return {
                        ...state,
                        notes: {
                            ...state.notes,
                            [action.transformed_date]: [...state.notes[action.transformed_date], action.note]
                        }
                    }
                } else {
                    return {
                        ...state,
                        notes: {
                            ...state.notes,
                            [action.transformed_date]: [action.note]
                        }
                    }
                }   
        default:
            return state;
    }
}



