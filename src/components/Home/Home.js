import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import { withAuthContext } from '../Context';
import NoteList from '../Notes/NoteList';
import AlertMessage from '../UI/AlertMessage/AlertMessage';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import Label from '../UI/Label/Label';
import './Home.css';

const Home = props => {
  const [notes, setNotes] = useState([]);
  const [state, setState] = useState({ id: '', title: '', body: '' });
  const [updateNote, setUpdateNote] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ message: '', status: '', showAlert: false });
  const { authenticated } = props; // from auth context
  const { id, title, body } = state;
  const { message, status, showAlert } = alertMessage;

  useEffect(() => {
    if (authenticated) {
      const arr = [];
      firebase.db
        .collection('digital_notes')
        .doc(firebase.auth.currentUser.uid)
        .collection('notes')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            arr.push({ id: doc.id, title: doc.data().title, body: doc.data().body });
          });
        })
        .then(() => {
          setNotes(arr);
        })
        .catch(error => {
          setAlertMessage({ message: error.message, status: 'error', showAlert: true });
        });
    }
  }, [authenticated]);

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleUpdateNote = docId => {
    const res = notes.filter(note => {
      console.log(note, docId);
      return note.id === docId;
    });
    // setUpdateNote(true);
    // setState({ id, title: res[0].title, body: res[0].body });
    console.log(res[0]);
  };

  const handleDeleteNote = noteID => {
    firebase.deleteNote(noteID);
    const arr = notes.filter(note => {
      return note.id !== noteID;
    });
    setNotes(arr);
  };

  const updateFirebaseNote = () => {
    firebase.updateNote(state);
  };

  // close alert message box
  const cancelAlert = () => {
    setAlertMessage(false);
  };

  console.log(state);
  return (
    <div className="homepage">
      {!authenticated ? (
        <>
          <div className="home-public">
            <h2>Quickly capture Notes and access them wherever you go.</h2>
            <Link to="/signup">Get Started</Link>
          </div>
        </>
      ) : (
        <div className="home-private">
          <h2>My Notes</h2>
          {showAlert && <AlertMessage message={message} status={status} cancelAlert={cancelAlert} />}
          {updateNote && (
            <form onSubmit={updateFirebaseNote}>
              <Label htmlForId="title">
                <Input
                  id="title"
                  type="text"
                  name="title"
                  placeholder="Title"
                  handleChange={handleChange}
                  value={state.title}
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
                  value={state.body}
                  required
                />
              </Label>
              <Button text="Update Note" />
            </form>
          )}
          <Link to="/add-new-note">Add New Note</Link>
          <NoteList notes={notes} handleUpdateNote={handleUpdateNote} handleDeleteNote={handleDeleteNote} />
        </div>
      )}
    </div>
  );
};

Home.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default withRouter(withAuthContext(Home));
