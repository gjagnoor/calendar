import {datestring} from './date_transformers.js';

export function filter_for_notes (all_notes, date) {
    return all_notes.filter((note) => {
        var today = new Date(date);
        var due_date = new Date(note.due_date);
        if (today.valueOf() <= due_date.valueOf()) {
            return note;
        }
    });
}

export function due_date_in_future(calendar_date, due_date) {
    calendar_date = new Date(calendar_date);
    due_date = new Date(due_date);
    return calendar_date.valueOf() < due_date.valueOf();
}

export function reset_note_to_add () {
    return {
        id: 0,
        name: 'add a task...',
        due_date: datestring(Date.now()),
        completed: false
    };
}