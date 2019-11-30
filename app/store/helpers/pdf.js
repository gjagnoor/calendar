import jsPDF from 'jspdf';

export function generate_pdf (notes, calendar_date) {
    var doc = new jsPDF();
        var y = 20;       
        doc.text(calendar_date, 10, 5)       
        notes.map((note, i) => {
            doc.text(note.name, 20, y);
            y = y * 2;
        })
    return doc.save(`${calendar_date.split(' ').join('-')}.pdf`);
}