// import React from 'react';
// import {connect} from 'react-redux';
// import {delete_note, update_note} from '../../store/store.js';
// import {filter_for_active_notes, due_date_in_future} from '../../store/helpers/notes.js';

// class Active_Notes extends React.Component {
//     constructor (props) {
//         super (props);
//     }

//     render() {
//         const { notes_on_calendar_date_and_futuredate, current_date, handleChange, handleClick, handleOnDrag } = this.props
//         return (
//             <div className='snuggle-fit border-bottom'>
//                 <div>
//                     {                            
//                         notes_on_calendar_date_and_futuredate ? notes_on_calendar_date_and_futuredate.map((note, i)=> {
//                             var class_val = '';
//                             due_date_in_future(current_date, note.due_date) ? class_val = "flex-row-left note snuggle-fit due-another-day" : class_val = "flex-row-left note snuggle-fit";
//                             return (
//                                 <div key = {i} className ={class_val} id={note.id} draggable="true" onDragStart={handleOnDrag}>
//                                     <div id="note-name">
//                                         <input id={note.id} name='name' type="text" value={note.name} onChange={handleChange} />
//                                     </div>
//                                     <div className="flex-row-center note-actions">
//                                         <div>
//                                             <input className='checkbox' name = "completed" type="checkbox" value={note.id} onClick={handleClick} />
//                                         </div>
//                                         <div className="flex-row-right">
//                                             <div>
//                                                 <button className="fas fa-trash-alt delete-note" name="delete-active-note" value={note.id} onClick={handleClick}></button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             )
//                         }) : (null)
//                     }
//                 </div>
//             </div>
//         )
//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         current_date: state.calendar.calendar_date,
//         notes_on_calendar_date_and_futuredate: filter_for_active_notes(state.tasks.notes, state.calendar.calendar_date)
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         handleClick (evt) {
//             var note_id = evt.target.value;
//             evt.target.checked === true && evt.target.name === 'completed' ? dispatch(update_note(note_id, 'completed', null)) : (null);
//             evt.target.name === 'delete-active-note' ? dispatch(delete_note(note_id)) : (null);
//             evt.preventDefault();
//         },
//         handleChange (evt) {
//             var update_to_name = evt.target.value;
//             var note_id = evt.target.id;
//             dispatch(update_note(note_id, 'name', update_to_name));
//         },
//         handleOnDrag (evt) {
//             evt.dataTransfer.setData("id", evt.target.id);
//         }
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Active_Notes);