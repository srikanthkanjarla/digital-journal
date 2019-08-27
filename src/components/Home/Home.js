import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import { withAuthContext } from '../Context';
import NoteList from '../Notes/NoteList';
import './Home.css';

const Home = props => {
  const [notes, setNotes] = useState([]);
  const [isUpdate,setUpdate] = useState(false);
  const { authenticated } = props; // from auth context

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
          console.log('Eorror:', error);
        });
    }
  }, [authenticated]);

  const handleUpdateNote = (id) => {
    // firebase.updateNote('DVXZClmFny3pEuz7Y7x2');
    setUpdate(true);
  };

  const handleDeleteNote = noteID => {
    firebase.deleteNote(noteID);
    const arr = notes.filter(note => {
      return note.id !== noteID;
    });
    setNotes(arr);
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
