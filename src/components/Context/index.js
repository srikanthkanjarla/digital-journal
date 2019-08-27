/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

const AuthContext = React.createContext(false);

export const withAuthContext = Component => props => {
  return (
    <AuthContext.Consumer>
      {authenticated => <Component {...props} authenticated={authenticated} />}
    </AuthContext.Consumer>
  );
};

export default AuthContext;
