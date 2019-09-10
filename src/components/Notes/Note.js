import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import Button from '../UI/Button/Button';
import './Note.css';

const Note = props => {
  const { id, title, body, color, handleUpdateNote, handleDeleteNote } = props;
  return (
    <div className="note-card" style={{ backgroundColor: color }}>
      <div className="btn-group">
        <Button btnClass="btn btn-sm btn-edit" handleClick={() => handleUpdateNote(id)}>
          <FontAwesomeIcon icon={faPencilAlt} />
        </Button>

        {/* <button type="button" title="Edit Note" className="edit-btn" onClick={() => handleUpdateNote(id)}>
            <FontAwesomeIcon icon={faPencilAlt} />
          </button> */}

        <Button btnClass="btn btn-sm btn-close" handleClick={() => handleDeleteNote(id)}>
          <FontAwesomeIcon icon={faTimes} />
        </Button>
        {/* <button type="button" title="Remove Note" className="del-btn" onClick={() => handleDeleteNote(id)}>
            <FontAwesomeIcon icon={faTimes} />
          </button> */}
      </div>
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  );
};

Note.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  handleDeleteNote: PropTypes.func.isRequired,
  handleUpdateNote: PropTypes.func.isRequired,
};
export default Note;
