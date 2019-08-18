import React from 'react';
import PropTypes from 'prop-types';
import './Note.css';

const Note = props => {
  const { title, body } = props;
  return (
    <div className="note-card">
      <h2>{title}</h2>
      <p>{body}</p>
      {/* <div className="note-btn-container">
        <span>
          <input type="button" value="Edit" className="edit-btn" />
        </span>
        <span>
          <input type="button" value="Delete" className="del-btn" />
        </span>
      </div> */}
    </div>
  );
};

Note.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};
export default Note;
