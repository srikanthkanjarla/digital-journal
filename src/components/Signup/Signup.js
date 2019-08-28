import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import { withAuthContext } from '../Context';
import Layout from '../Layout/Layout';
import Input from '../UI/Input/Input';
import Label from '../UI/Label/Label';
import Button from '../UI/Button/Button';
import AlertMessage from '../UI/AlertMessage/AlertMessage';
import ErrorMessage from '../UI/InputErrorMessage/InputErrorMessage';
import { validateUsername, validateEmail, validatepassword, validateConfirmPassword } from '../formValidations';
import './Signup.css';

const Signup = props => {
  // state data
  const [state, setState] = useState({ fullname: '', email: '', password1: '', password2: '' });
  const [alertMessage, setAlertMessage] = useState({ message: '', status: '', showAlert: false });
  const [usernameError, setUsernameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [password1Error, setPassword1Error] = useState(null);
  const [password2Error, setPassword2Error] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // destructure state and props
  const { message, status, showAlert } = alertMessage;
  const { authenticated, history } = props; // authenticated from AuthContext
  const { fullname, email, password1, password2 } = state;
  const isStateEmpty = fullname === '' || email === '' || password1 === '' || password2 === '';
  const noFormErros = !usernameError && !emailError && !password1Error && !password2Error;

  // redirect authenticated user to home page
  useEffect(() => {
    if (authenticated) {
      history.replace('/');
    }
  });
  // form validations
  const checkUsername = () => {
    setUsernameError(validateUsername(fullname));
  };

  const checkEmail = () => {
    setEmailError(validateEmail(email));
  };
  const checkPassword1 = () => {
    setPassword1Error(validatepassword(password1));
  };
  const checkPassword2 = () => {
    setPassword2Error(validateConfirmPassword(password1, password2));
  };

  const validateForm = () => {
    checkUsername();
    checkEmail();
    checkPassword1();
    checkPassword2();
  };

  // handle signup form fields state
  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  // handle registe user - create user on firebase
  const handleSubmit = async event => {
    event.preventDefault();
    setIsSubmitted(true);
    if (isStateEmpty) {
      validateForm();
    }
    if (!isStateEmpty) {
      if (noFormErros) {
        try {
          await firebase.register(fullname, email, password1).then(() => {
            history.push('/');
          });
        } catch (error) {
          setAlertMessage({ message: error.message, status: 'error', showAlert: true });
          setIsSubmitted(false);
        }
      }
    }
  };

  // close alert message box
  const cancelAlert = () => {
    setAlertMessage(false);
  };

  return (
    <Layout>
      <div className="signup">
        {showAlert && <AlertMessage message={message} status={status} cancelAlert={cancelAlert} />}
        <h2>Register Now</h2>
        <form onSubmit={handleSubmit}>
          <Label htmlForId="fullname">
            <Input
              id="fullname"
              type="text"
              value={fullname}
              placeholder="Fullname"
              name="fullname"
              handleChange={handleChange}
              validateForm={checkUsername}
            />
          </Label>
          {usernameError && <ErrorMessage message={usernameError} />}
          <Label htmlForId="email">
            <Input
              id="email"
              type="email"
              value={email}
              placeholder="Email"
              name="email"
              handleChange={handleChange}
              validateForm={checkEmail}
            />
          </Label>
          {emailError && <ErrorMessage message={emailError} />}
          <Label htmlForId="password1">
            <Input
              id="password1"
              type="password"
              value={password1}
              placeholder="Password"
              name="password1"
              handleChange={handleChange}
              validateForm={checkPassword1}
            />
          </Label>
          {password1Error && <ErrorMessage message={password1Error} />}
          <Label htmlForId="password2">
            <Input
              id="password2"
              type="password"
              value={password2}
              placeholder="Confirm Password"
              name="password2"
              handleChange={handleChange}
              validateForm={checkPassword2}
            />
          </Label>
          {password2Error && <ErrorMessage message={password2Error} />}
          <Button text="Register Now" disabled={isSubmitted} />
        </form>
        <p>
          Already have an account?
          <span className="have-account-link">
            {' '}
            <Link to="/login">Signin</Link>
          </span>
        </p>
      </div>
    </Layout>
  );
};

Signup.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  replace: PropTypes.func,
  history: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.any])).isRequired,
};

Signup.defaultProps = {
  replace: null,
};

export default withRouter(withAuthContext(Signup));
