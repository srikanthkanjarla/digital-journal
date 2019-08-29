import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { withAuthContext } from '../Context';
import Layout from '../Layout/Layout';
import AddNoteForm from '../UI/AddNoteForm/AddNoteForm';

const AddNote = props => {
  const { authenticated, history } = props;

  useEffect(() => {
    if (!authenticated) {
      history.push('/');
    }
  });

  return (
    <Layout>
      <div className="add-note-form">
        <h1>Add New Note</h1>
        <AddNoteForm />
      </div>
    </Layout>
  );
};

AddNote.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default withRouter(withAuthContext(AddNote));
