import React from 'react';
import PropTypes from 'prop-types';

const Label = props => {
  const { children, htmlForId } = props;
  return <label htmlFor={htmlForId}>{children}</label>;
};

Label.propTypes = {
  htmlForId: PropTypes.string.isRequired,
};
export default Label;
