function delete_active_note (i, active_notes, date) {
    var transformed_date = date.join("_");
    var notes_after_deletion = active_notes[transformed_date].slice(0);
    notes_after_deletion.splice(i, 1);
    return [notes_after_deletion, transformed_date];
}

export default delete_active_note;