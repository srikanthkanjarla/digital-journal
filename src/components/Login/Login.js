import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import { withAuthContext } from '../AuthContext';
import Layout from '../Layout/Layout';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Label from '../UI/Label/Label';
import AlertMessage from '../UI/AlertMessage/AlertMessage';
import Spinner from '../UI/Spinner/Spinner';
import './Login.css';

const Login = props => {
  // state data
  const [state, setState] = useState({ username: '', password: '' });
  const [processing, setProcessing] = useState(false);
  const [alertMessage, setAlertMessage] = useState({ message: '', status: '', showAlert: false });

  // destructure state and props
  const { username, password } = state;
  const { authenticated, history } = props;
  const { message, status, showAlert } = alertMessage;

  // redirect authenticated user to home page
  useEffect(() => {
    if (authenticated) {
      history.replace('/');
    }
  });

  // handle input change and update state
  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  // handle user login
  const handleLogin = async event => {
    event.preventDefault();
    if (username !== '' && password !== '') {
      try {
        setProcessing(true);
        await firebase.login(state.username, state.password);
      } catch (error) {
        setProcessing(false);
        setAlertMessage({ message: error.message, status: 'error', showAlert: true });
      }
    }
  };

  // close alert message box
  const cancelAlert = () => {
    setAlertMessage(false);
  };

  return (
    <Layout>
      <div className="login-form">
        <h2>Welcome back</h2>
        {showAlert && <AlertMessage message={message} status={status} cancelAlert={cancelAlert} />}
        <form>
          <Label htmlForId="username">
            <Input
              id="username"
              type="text"
              name="username"
              value={state.username}
              handleChange={handleChange}
              placeholder="Username"
              required
            />
          </Label>
          <Label htmlForId="password">
            <Input
              id="password"
              type="password"
              name="password"
              value={state.password}
              handleChange={handleChange}
              placeholder="Password"
              required
            />
          </Label>
          <Button btnClass="btn btn-lg" disabled={processing} handleClick={handleLogin}>
            Login
            {processing && <Spinner size={1.5} theme="dark" />}
          </Button>
        </form>
        <p>
          Don&apos;t have an account ?
          <span>
            {' '}
            <Link to="/signup">Signup</Link>
          </span>
        </p>
      </div>
    </Layout>
  );
};

Login.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  history: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.any])).isRequired,
};

export default withRouter(withAuthContext(Login));
