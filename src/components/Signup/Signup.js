import React, { useState } from 'react';
import InputField from '../InputField/InputField';
import Layout from '../Layout/Layout';

const Signup = () => {
  const [state, setState] = useState({ firstname: '', lastname: '', email: '', password: '', confPassword: '' });
  const handleChange = event => {
    setState({ [event.target.name]: event.target.value });
  };
  const handleSubmit = () => {};

  const { firstname, lastname, email, password, confPassword } = state;
  return (
    <Layout>
      <div className="signup">
        <h2>Register Now</h2>
        <form onSubmit={handleSubmit}>
          <InputField type="text" value={firstname} placeholder="Firstname" name="firstname" onChange={handleChange} />
          <InputField type="text" value={lastname} placeholder="Lastname" name="lastname" onChange={handleChange} />
          <InputField type="email" value={email} placeholder="Email" name="email" onChange={handleChange} />
          <InputField type="password" value={password} placeholder="Password" name="passwrod" onChange={handleChange} />
          <InputField
            type="password"
            value={confPassword}
            placeholder="Re type password"
            name="confPassword"
            onChange={handleChange}
          />
          <InputField type="submit" value="Register" name="register" styles="btn" />
        </form>
      </div>
    </Layout>
  );
};

export default Signup;
