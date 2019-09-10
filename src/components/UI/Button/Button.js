import React from 'react';
import PropTypes from 'prop-types';
import './Button.css';

const Button = props => {
  const { disabled, children, btnClass, handleClick } = props;
  return (
    <button disabled={disabled} type="button" className={btnClass} onClick={handleClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool,
  btnClass: PropTypes.string,
  handleClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
};

Button.defaultProps = {
  disabled: false,
  btnClass: null,
  handleClick: null,
};
export default Button;
