import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import { withAuthContext } from '../Context';
import Layout from '../Layout/Layout';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Label from '../UI/Label/Label';

const AddNote = props => {
  const [state, setState] = useState({ title: '', body: '' });
  // const [notes, setNotes] = useState([]);
  // const [noteId, setNoteId] = useState(0);

  const { title, body } = state;
  const { authenticated, history } = props;
  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    // save note to firebase
    event.preventDefault();
    // setNotes([...notes, { id: noteId, title: state.title, body: state.body }]);
    // setState({ title: '', body: '' });
    // setNoteId(noteId + 1);
    if (state.title !== '' && state.body !== '') {
      firebase.addNote(state);
      props.history.push("/");
    }
  };

  if (!authenticated) {
    history.push('/');
    return null;
  }

  return (
    <Layout>
      <div className="add-note-form">
        <h1>Add New Note</h1>
        <form onSubmit={handleSubmit}>
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
          <Button text="Add Note" />
        </form>
      </div>
    </Layout>
  );
};

AddNote.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default withRouter(withAuthContext(AddNote));
