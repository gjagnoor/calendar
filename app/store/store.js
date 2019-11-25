import { createStore, combineReducers } from 'redux';
import calendar from './calendar.js';
import notes from './notes.js'

// reorganize state
/*
*/

// create store object 
const store = createStore(combineReducers({
    calendar, 
    notes
}));

// export store 
export default store;
export * from './calendar';
export * from './notes.js';