import React, { useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';

import { withAuthContext } from '../Context';
import Input from '../UI/Input/Input';
import Label from '../UI/Label/Label';
import Button from '../UI/Button/Button';
import Layout from '../Layout/Layout';

import './Signup.css';

const Signup = props => {
  const [state, setState] = useState({ fullname: '', email: '', password: '', confPassword: '' });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async event => {
    const { fullname, email, password } = state;
    event.preventDefault();
    try {
      await firebase.register(fullname, email, password);
    } catch (error) {
      alert(error.message);
    }
    setState({ fullname: '', email: '', password: '', confPassword: '' });
  };

  const { fullname, email, password, confPassword } = state;
  const { authenticated, history } = props;

  useEffect(() => {
    if (authenticated) {
      history.push('/');
    }
    return null;
  });

  return (
    <Layout>
      <div className="signup">
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
            />
          </Label>
          <Label htmlForId="email">
            <Input
              id="email"
              type="email"
              value={email}
              placeholder="Email"
              name="email"
              handleChange={handleChange}
              required
            />
          </Label>
          <Label htmlForId="password">
            <Input
              id="password"
              type="password"
              value={password}
              placeholder="Password"
              name="password"
              handleChange={handleChange}
              required
            />
          </Label>
          <Label htmlForId="confPassword">
            <Input
              id="confPassword"
              type="password"
              value={confPassword}
              placeholder="Re type password"
              name="confPassword"
              handleChange={handleChange}
              required
            />
          </Label>
          <Button text="Register Now" />
        </form>
        <p>
          Already have an account?
          <span>
            {' '}
            <Link to="/login">Signin</Link>
          </span>
        </p>
      </div>
    </Layout>
  );
};

export default withRouter(withAuthContext(Signup));
