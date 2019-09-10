import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

const InputField = props => {
  const { id, type, name, value, handleChange, validateForm, cssClass, placeholder, required } = props;
  return (
    <input
      id={id}
      type={type}
      name={name}
      value={value}
      onChange={handleChange}
      onBlur={validateForm}
      placeholder={placeholder}
      className={`input-field ${cssClass || ''}`}
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
  cssClass: PropTypes.string,
  handleChange: PropTypes.func,
  validateForm: PropTypes.func,
  required: PropTypes.bool,
};

InputField.defaultProps = {
  cssClass: null,
  handleChange: () => false,
  validateForm: () => false,
  placeholder: '',
  required: false,
};
export default InputField;
