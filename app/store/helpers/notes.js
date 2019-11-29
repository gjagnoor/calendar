export function filter_for_active_notes (all_notes, calendar_date) {
    return all_notes.filter((note) => {
        if (!note.completed) {
            var today = new Date(calendar_date);
            var due_date = new Date(note.due_date);
            if (today.valueOf() <= due_date.valueOf()) {
                return note;
            }
        }
    });  
}

export function due_date_in_future(calendar_date, due_date) {
    calendar_date = new Date(calendar_date);
    due_date = new Date(due_date);
    return calendar_date.valueOf() < due_date.valueOf();
}