import React from 'react';
import PropTypes from 'prop-types';
import './Note.css';

const Note = props => {
  const { id, title, body, handleUpdateNote, handleDeleteNote, color } = props;
  return (
    <div className="note-card" style={{ backgroundColor: color }}>
      <h2>{title}</h2>
      <p>{body}</p>
      <div className="note-btn">
        <span>
          <input type="button" value="&#9998;" className="edit-btn" onClick={() => handleUpdateNote(id)} />
        </span>
        <span>
          <input type="button" value="&times;" className="del-btn" onClick={() => handleDeleteNote(id)} />
        </span>
      </div>
    </div>
  );
};

Note.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  handleDeleteNote: PropTypes.func.isRequired,
  handleUpdateNote: PropTypes.func.isRequired,
};
export default Note;
