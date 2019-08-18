import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import AddNoteForm from '../Notes/AddNoteForm';
import NoteList from '../Notes/NoteList';

const Home = () => {
  const [state, setState] = useState({ title: '', body: '' });
  const [notes, setNotes] = useState([]);
  const [noteId, setNoteId] = useState(0);

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setNotes([...notes, { id: noteId, title: state.title, body: state.body }]);
    setState({ title: '', body: '' });
    setNoteId(noteId + 1);
  };

  return (
    <Layout>
      <h2>Add New Note</h2>
      <AddNoteForm handleChange={handleChange} handleSubmit={handleSubmit} title={state.title} body={state.body} />
      <NoteList notes={notes} />
    </Layout>
  );
};

export default Home;
