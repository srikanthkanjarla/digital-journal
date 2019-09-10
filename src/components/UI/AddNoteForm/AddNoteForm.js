import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Input from '../Input/Input';
import Label from '../Label/Label';
import Button from '../Button/Button';
import './AddNoteForm.css';
import Spinner from '../Spinner/Spinner';

const AddNoteForm = props => {
  const { title, body, processing, closeForm, formAction, handleSaveOrUpdate, handleChange } = props;

  return (
    <div className="form-container">
      <div className="new-note-form">
        <form>
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
          <Button btnClass=" btn btn-lg" disabled={processing} handleClick={handleSaveOrUpdate}>
            {formAction === 'update' ? 'Update Note' : 'Add New Note'}
            {processing && <Spinner size={1.5} theme="dark" />}
          </Button>
          <div style={{ position: 'absolute', top: 0, right: 0 }}>
            <Button btnClass="btn btn-sm btn-close" handleClick={closeForm}>
              <FontAwesomeIcon icon={faTimes} />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddNoteForm.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  formAction: PropTypes.string.isRequired,
  processing: PropTypes.bool.isRequired,
  closeForm: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSaveOrUpdate: PropTypes.func.isRequired,
};
export default AddNoteForm;
