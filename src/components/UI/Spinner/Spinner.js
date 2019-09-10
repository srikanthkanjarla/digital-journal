import React from 'react';
import PropTypes from 'prop-types';
import './Spinner.css';

const Spinner = props => {
  const { size, theme } = props;

  return <div className={`loading-spinner ${theme}`} style={{ height: `${size * 10}px`, width: `${size * 10}px` }} />;
};

Spinner.propTypes = {
  size: PropTypes.number.isRequired,
  theme: PropTypes.string.isRequired,
};
export default Spinner;
