import { createStore, combineReducers } from 'redux';
import calendar from './calendar.js';
import active_notes, {new_reducers} from './notes/active_notes.js';
import completed_notes from './notes/completed_notes.js';

// reorganize state
/*
*/

// create store object 
const store = createStore(combineReducers({
    calendar, 
    active_notes,
    completed_notes
}));

// export store 
export default store;
export * from './calendar';
export * from './notes/active_notes.js';
export * from './notes/completed_notes.js';