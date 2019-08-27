import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import { withAuthContext } from '../Context';
import Layout from '../Layout/Layout';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import Label from '../UI/Label/Label';
// import ErrorMessage from '../UI/InputErrorMessage/InputErrorMessage';
import './Login.css';

const Login = props => {
  const [state, setState] = useState({ username: '', password: '' });
  const [isLogin, setLogin] = useState(false);
  // const [usernameError, setusernameError] = useState(null);
  // const [passwordError, setPasswordError] = useState(null);
  // const [isFormValid, setFormValid] = useState(false);

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  // your password must be at least 6 characters
  // please enter a valid email address
  // please enter a username
  // please enter a password

  const handleLogin = async event => {
    event.preventDefault();
    // if (state.username.length <= 3) {
    //   setusernameError('username must be at least 6 characters');
    // }

    // if (state.username.length === 0) {
    //   setusernameError('Please enter a username');
    // }
    // if (state.password.length <= 5) {
    //   setPasswordError('password must be at least 6 characters');
    // }

    // if (state.password.length === 0) {
    //   setPasswordError('Please Enter a password');
    // }
    if (state.username.length !== 0 && state.password.length !== 0) {
      try {
        await firebase.login(state.username, state.password);
        setLogin(true);
        props.history.replace('/');
      } catch (error) {
        alert(error.message);
      }
    }
  };
  useEffect(() => {
    if (props.authenticated) {
      props.history.replace('/');
    }
  });

  return (
    <Layout>
      <div className="login-form">
        <h2>Welcome back</h2>
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
          {/* {usernameError && <ErrorMessage message={usernameError} />} */}
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
          {/* {passwordError && <ErrorMessage message={passwordError} />} */}
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
};

export default withRouter(withAuthContext(Login));
