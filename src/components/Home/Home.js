import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faStickyNote } from '@fortawesome/free-solid-svg-icons';
import firebase from '../../firebase';
import { withAuthContext } from '../AuthContext';
import NoteList from '../Notes/NoteList';
import AlertMessage from '../UI/AlertMessage/AlertMessage';
import UpdateNoteForm from '../UI/AddNoteForm/AddNoteForm';
import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';
import './Home.css';

const Home = props => {
  // state data
  const INITIAL_STATE = { id: '', title: '', body: '' };
  const [notes, setNotes] = useState([]); // store all the notes
  const [state, setState] = useState(INITIAL_STATE); // store form data to add/update note
  const [formAction, setFormAction] = useState(''); // form action type add/update
  const [showForm, setShowForm] = useState(false); // show/hide add/update note form
  const [loadingNotes, setLoadingNotes] = useState(false); // show spinner while loading notes on page
  const [processing, setProcessing] = useState(false); // show spinner on button while processing request
  const [alertMessage, setAlertMessage] = useState({ message: '', status: '', showAlert: false }); // show success or error alerts

  // destructure state and props
  const { authenticated } = props; // authentication status from AuthContext
  const { title, body } = state;
  const { message, status, showAlert } = alertMessage;

  // colors to add random color to note card background
  const cardColors = [
    '#F9F871',
    '#F9EAFF',
    '#C5FCEF',
    '#EFA6FF',
    '#52FBDD',
    '#FFBB33',
    '#FFE3F1',
    '#C0FCF9',
    '#D7DAFF',
  ];
  const getRandomColor = () => {
    return cardColors[Math.floor(Math.random() * cardColors.length)];
  };

  // get notes from firebase on initial page loads
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
            arr.push({ id: doc.id, title: doc.data().title, body: doc.data().body, color: getRandomColor() });
          });
        })
        .then(() => {
          setLoadingNotes(true);
        })
        .then(() => {
          setNotes(arr);
        })
        .then(() => {
          setLoadingNotes(false);
        })
        .catch(error => {
          setAlertMessage({ message: error.message, status: 'error', showAlert: true });
        });
    }
    // eslint-disable-next-line
  }, [authenticated]);

  // close alert message box
  const cancelAlert = () => {
    setAlertMessage(false);
  };

  // close add/update note form
  const closeForm = () => {
    setShowForm(false);
  };

  // handle user input and update state
  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  // show add new note form and save note to firebase
  const handeleAddNote = () => {
    // TODO -  useReducer to update state of form action and showform
    setFormAction('addNew');
    setShowForm(true);
  };

  // show update ntoe form and update note on firebase
  const handleUpdateNote = noteId => {
    // TODO useReducer to update state of data showform and formaction
    const res = notes.filter(note => {
      return note.id === noteId;
    });
    // const { resId, title, body } = res[0];
    setFormAction('update');
    setState({ id: res[0].id, title: res[0].title, body: res[0].body, color: res[0].color });
    setShowForm(true);
  };

  // save or update note
  const saveOrUpdateNote = event => {
    event.preventDefault();
    if (title !== '' && body !== '') {
      // save new note to firebase
      setProcessing(true);
      if (formAction === 'addNew') {
        try {
          firebase
            .addNote({ title, body })
            .then(docRef => {
              setNotes([{ id: docRef.id, title, body, color: getRandomColor() }].concat(notes));
            })
            .then(() => {
              closeForm();
              setProcessing(false);
              setState(INITIAL_STATE);
            })
            .catch(error => {
              setAlertMessage({ message: error.message, status: 'error', showAlert: true });
            });
        } catch (error) {
          setAlertMessage({ message: error.message, status: 'error', showAlert: true });
        }
      }
    }
    // update content of the note
    if (formAction === 'update') {
      try {
        firebase
          .updateNote(state)
          .then(() => {
            closeForm();
          })
          .then(() => {
            const arr1 = [];
            const arr2 = [];
            // keep the index of updated item in notes array to maintaine the same order on display
            notes.map((note, index) => {
              if (note.id === state.id) {
                arr1.push(notes.slice(0, index)); // extract array upto updated item
                arr2.push(notes.slice(index + 1)); // extract array after updated item
              }
              return null;
            });
            setNotes(arr1[0].concat(state).concat(arr2[0]));
          })
          .then(() => {
            setProcessing(false);
            setState(INITIAL_STATE);
            console.log('update successful');
          });
      } catch (error) {
        setAlertMessage({ message: error.message, status: 'error', showAlert: true });
      }
    }
  };

  // delete note on firebase
  const handleDeleteNote = id => {
    setLoadingNotes(true);
    try {
      firebase
        .deleteNote(id)
        .then(() => {
          const arr = notes.filter(note => {
            return note.id !== id;
          });
          setNotes(arr);
        })
        .then(() => {
          setLoadingNotes(false);
        })
        .then(() => {
          console.log('deleted successfully');
        });
    } catch (error) {
      setAlertMessage({ message: error.message, status: 'error', showAlert: true });
    }
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
          <h2>
            <FontAwesomeIcon icon={faStickyNote} />
            <span style={{ marginLeft: '0.4rem' }}>My Notes</span>
          </h2>
          {showAlert && <AlertMessage message={message} status={status} cancelAlert={cancelAlert} />}
          {showForm && (
            <UpdateNoteForm
              title={title}
              body={body}
              formAction={formAction}
              closeForm={closeForm}
              handleChange={handleChange}
              handleSaveOrUpdate={saveOrUpdateNote}
              processing={processing}
            />
          )}
          <Button handleClick={handeleAddNote} btnClass="btn btn-add-new">
            <FontAwesomeIcon icon={faPlusCircle} size="lg" />
            <span style={{ marginLeft: '0.5rem' }}>Add New Note</span>
          </Button>
          {!loadingNotes ? (
            <NoteList notes={notes} handleUpdateNote={handleUpdateNote} handleDeleteNote={handleDeleteNote} />
          ) : (
            <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Spinner size={3} theme="light" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

Home.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

export default withRouter(withAuthContext(Home));
