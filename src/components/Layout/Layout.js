import React from 'react';
import PropTypes from 'prop-types';
import './Layout.css';

const Layout = props => {
  const { children } = props;
  return <div className="container">{children}</div>;
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]).isRequired,
};
export default Layout;
