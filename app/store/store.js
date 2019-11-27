import { createStore, combineReducers } from 'redux';
import calendar from './calendar.js';
import tasks from './notes.js';

// reorganize state
/*
*/

// create store object 
const store = createStore(combineReducers({
    calendar, 
    tasks
}));

// export store 
export default store;
export * from './calendar';
export * from './notes.js';