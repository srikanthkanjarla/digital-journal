import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

const InputField = props => {
  const { id, type, name, value, handleChange, styles, placeholder, required } = props;
  return (
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={`input-field ${styles || ''}`}
      required={required && true}
    />
  );
};

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  styles: PropTypes.string,
  handleChange: PropTypes.func,
  required: PropTypes.bool,
};

InputField.defaultProps = {
  styles: null,
  handleChange: () => false,
  placeholder: '',
  required: false,
};
export default InputField;
