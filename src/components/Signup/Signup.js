import React, { useState } from 'react';
import InputField from '../InputField/InputField';
import Layout from '../Layout/Layout';
import './Signup.css';

const Signup = () => {
  const [state, setState] = useState({ firstname: '', lastname: '', email: '', password: '', confPassword: '' });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    setState({ fullname: '', email: '', password: '', confPassword: '' });
  };

  const { fullname, email, password, confPassword } = state;
  return (
    <Layout>
      <div className="signup">
        <h2>Register Now</h2>
        <form onSubmit={handleSubmit}>
          <InputField type="text" value={fullname} placeholder="Fullname" name="fullname" handleChange={handleChange} />
          <InputField
            type="email"
            value={email}
            placeholder="Email"
            name="email"
            handleChange={handleChange}
            required
          />
          <InputField
            type="password"
            value={password}
            placeholder="Password"
            name="password"
            handleChange={handleChange}
            required
          />
          <InputField
            type="password"
            value={confPassword}
            placeholder="Re type password"
            name="confPassword"
            handleChange={handleChange}
            required
          />
          <InputField type="submit" value="Register" name="register" styles="btn" />
        </form>
      </div>
    </Layout>
  );
};

export default Signup;
