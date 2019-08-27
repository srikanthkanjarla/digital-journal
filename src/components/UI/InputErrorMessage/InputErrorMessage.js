import React from 'react';
import PropTypes from 'prop-types';
import './InputErrorMessage.css';

const ErrorMessage = props => {
  const { message } = props;
  return <p className="error-msg">{message}</p>;
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};
export default ErrorMessage;
