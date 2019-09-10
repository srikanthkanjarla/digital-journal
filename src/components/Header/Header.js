import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../firebase';
import { withAuthContext } from '../AuthContext';
import './Header.css';

// const value = useContext(AuthContext);
const Header = props => {
  const logoutUser = async () => {
    await firebase.auth.signOut();
    props.history.push('/');
  };
  const { authenticated } = props;
  return (
    <header className="header">
      <h1>
        <Link to="/">Digital Journal</Link>
      </h1>
      <nav>
        <ul>
          {!authenticated ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">signup</Link>
              </li>
            </>
          ) : (
            <>
              <h4>
                Welcome
                <span>{firebase.getCurrentUsername()}</span>
              </h4>
              <li>
                <button type="button" className="logout-btn" onClick={logoutUser}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  history: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.any])).isRequired,
};

export default withRouter(withAuthContext(Header));
