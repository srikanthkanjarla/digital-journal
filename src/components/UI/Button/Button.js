import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = props => {
  const { text, disabled } = props;
  return (
    <button disabled={disabled} type="submit" className="btn">
      {text}
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
};
export default Button;
