import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebase from '../../firebase';
import AuthContext from '../Context';
import Header from '../Header/Header';
import Home from '../Home/Home';
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import AddNote from '../Notes/AddNoteForm';
import './App.css';

const App = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    firebase.auth.onAuthStateChanged(user => {
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }
    });
  }, []);
  return (
    <AuthContext.Provider value={isAuthenticated}>
      <Router>
        <div className="app">
          <Header authenticated={isAuthenticated} />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/add-new-note" component={AddNote} />
          </Switch>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
