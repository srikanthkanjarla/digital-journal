import React, { useState } from 'react';
import Layout from '../Layout/Layout';
import InputField from '../InputField/InputField';
import './Login.css';

const Login = () => {
  const [state, setState] = useState({ username: '', password: '' });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleLogin = event => {
    event.preventDefault();
  };

  return (
    <Layout>
      <div className="login-form">
        <h2>Welcome back</h2>
        <form onSubmit={handleLogin}>
          <InputField
            type="text"
            name="username"
            value={state.username}
            handleChange={handleChange}
            placeholder="Username"
            required
          />
          <InputField
            type="password"
            name="password"
            value={state.password}
            handleChange={handleChange}
            placeholder="Password"
            required
          />
          <InputField type="submit" name="login" value="Login" styles="btn" />
        </form>
      </div>
    </Layout>
  );
};

export default Login;
