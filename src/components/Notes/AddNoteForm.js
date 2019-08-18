import React from 'react';
import PropTypes from 'prop-types';
import InputField from '../InputField/InputField';

const AddNote = props => {
  const { title, body, handleChange, handleSubmit } = props;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputField type="text" name="title" placeholder="Title" handleChange={handleChange} value={title} required />
        <textarea rows="5" placeholder="body" name="body" onChange={handleChange} value={body} required />
        <InputField type="submit" name="submit" value="Add Note" styles="btn" />
      </form>
    </div>
  );
};

AddNote.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default AddNote;
