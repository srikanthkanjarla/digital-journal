import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import firebase from '../../../firebase';
import Input from '../Input/Input';
import Label from '../Label/Label';
import Button from '../Button/Button';
import './AddNoteForm.css';

const AddNoteForm = props => {
  const [state, setState] = useState({ id: '', title: '', body: '' });
  const { title, body } = state;
  const { data, closeForm, formAction } = props;

  useEffect(() => {
    if (formAction === 'update') {
      setState(data);
    }
  }, [data]);

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    // save note to firebase
    event.preventDefault();
    if (title !== '' && body !== '') {
      if (formAction === 'addNew') {
        try {
          firebase.addNote(state);
          closeForm();
        } catch (error) {
          console.log('Error - ', error);
        }
      }

      if (formAction === 'update') {
        try {
          firebase.updateNote(state);
          closeForm();
        } catch (error) {
          console.log('Error - ', error);
        }
      }
    }
  };

  return  (
    <div className="form-container">
      <div className="new-note-form">
        <form onSubmit={handleSubmit}>
          <h2>{formAction === 'update' ? 'Update Note' : 'Add New Note'}</h2>
          <Label htmlForId="title">
            <Input
              id="title"
              type="text"
              name="title"
              placeholder="Title"
              handleChange={handleChange}
              value={title}
              required
            />
          </Label>
          <Label htmlForId="note">
            <textarea
              id="note"
              rows="5"
              placeholder="Take a note..."
              name="body"
              onChange={handleChange}
              value={body}
              required
            />
          </Label>
          <Button text={formAction === 'update' ? 'Update Note' : 'Add New Note'} />
          <button type="button" className="close-form" onClick={closeForm}>
            &times;
          </button>
        </form>
      </div>
    </div>
  );
};

AddNoteForm.propTypes = {
  formAction: PropTypes.string.isRequired,
  closeForm: PropTypes.func.isRequired,
};
export default AddNoteForm;
