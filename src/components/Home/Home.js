import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import { withAuthContext } from '../Context';
import NoteList from '../Notes/NoteList';
import AlertMessage from '../UI/AlertMessage/AlertMessage';
import UpdateNoteForm from '../UI/AddNoteForm/AddNoteForm';
import './Home.css';

const Home = props => {
  const [notes, setNotes] = useState([]);
  const [state, setState] = useState({ id: '', title: '', body: '' });
  const [formAction, setFormAction] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ message: '', status: '', showAlert: false });
  const { authenticated } = props; // from auth context
  const { message, status, showAlert } = alertMessage;

  const getAllNotes = () => {
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
  };
  useEffect(() => {
    if (authenticated) {
      getAllNotes();
    }
  }, [showForm]);

  const handeleAddNote = () => {
    setShowForm(true);
    setFormAction('addNew');
  };

  const handleUpdateNote = docId => {
    const res = notes.filter(note => {
      return note.id === docId;
    });
    const { id, title, body } = res[0];
    setState({ id, title, body });
    setShowForm(true);
    setFormAction('update');
    getAllNotes();
  };

  const handleDeleteNote = id => {
    firebase.deleteNote(id);
    // const arr = notes.filter(note => {
    //   return note.id !== id;
    // });
    // setNotes(arr);
    getAllNotes();
  };

  // close alert message box
  const cancelAlert = () => {
    setAlertMessage(false);
  };

  const closeForm = () => {
    setShowForm(false);
  };

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
          {showForm && <UpdateNoteForm formAction={formAction} data={state} closeForm={closeForm} />}
          <button type="button" onClick={handeleAddNote} className="add-new-btn">
            Add New Note
          </button>
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
