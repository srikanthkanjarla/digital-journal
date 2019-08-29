import React from 'react';
import PropTypes from 'prop-types';
import Note from './Note';

const NoteList = props => {
  const { notes = [], handleUpdateNote, handleDeleteNote } = props;
  const cardColors = ['#F9F871', '#F9EAFF', '#C5FCEF', '#EFA6FF', '#52FBDD', '#FFBB33'];
  return (
    <div className="notes-container">
      {notes.length !== 0 &&
        notes.map(note => {
          const color = cardColors[Math.floor(Math.random() * cardColors.length)];
          return (
            <Note
              key={note.id}
              id={note.id}
              title={note.title}
              body={note.body}
              handleDeleteNote={handleDeleteNote}
              handleUpdateNote={handleUpdateNote}
              color={color}
            />
          );
        })}
    </div>
  );
};

NoteList.propTypes = {
  notes: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))).isRequired,
  handleDeleteNote: PropTypes.func.isRequired,
  handleUpdateNote: PropTypes.func.isRequired,
};
export default NoteList;
