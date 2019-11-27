
// initial state
export var initialState = {
    notes: {
        '2019_11_25': ['note 25-3', 'note 25-4'],
        '2019_11_24': ['note 24-1']
    }
}

// action types 

// action creators 

// reducer 
export default function completed_notes (state = initialState, action) {
    switch(action.type) {
        default:
            return state;
    }
}



