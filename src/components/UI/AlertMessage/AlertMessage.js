import React from 'react';
import PropTypes from 'prop-types';
import './AlertMessage.css';

const AlertMessage = props => {
  const { message, cancelAlert, status } = props;
  return (
    <div className={`alert-box ${status}`}>
      <button className="alert-cancel-btn" type="button" onClick={cancelAlert}>
        &times;
      </button>
      <p>{message}</p>
    </div>
  );
};

AlertMessage.propTypes = {
  message: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  cancelAlert: PropTypes.func.isRequired,
};
export default AlertMessage;
