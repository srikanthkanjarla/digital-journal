import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import { withAuthContext } from '../Context';
import Layout from '../Layout/Layout';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Label from '../UI/Label/Label';
import AlertMessage from '../UI/AlertMessage/AlertMessage';
import './Login.css';

const Login = props => {
  // state data
  const [state, setState] = useState({ username: '', password: '' });
  const [isLogin, setLogin] = useState(false);
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
    if (username !== '' && password !== 0) {
      try {
        setLogin(true);
        await firebase.login(state.username, state.password);
      } catch (error) {
        setAlertMessage({ message: error.message, status: 'error', showAlert: true });
        setLogin(false);
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
        <form onSubmit={handleLogin}>
          <Label htmlForId="username">
            <Input
              id="username"
              type="text"
              name="username"
              value={state.username}
              handleChange={handleChange}
              placeholder="Username"
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
            />
          </Label>
          <Button text="Login" disabled={isLogin} />
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
