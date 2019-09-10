import React from 'react';
import PropTypes from 'prop-types';
import Note from './Note';

const NoteList = props => {
  const { notes = [], handleUpdateNote, handleDeleteNote } = props;

  return (
    <div className="notes-container">
      {notes.length !== 0 &&
        notes.map(note => {
          return (
            <Note
              key={note.id}
              id={note.id}
              title={note.title}
              body={note.body}
              color={note.color}
              handleDeleteNote={handleDeleteNote}
              handleUpdateNote={handleUpdateNote}
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
