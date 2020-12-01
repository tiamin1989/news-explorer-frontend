import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ component: Component, ...props }) => (
  <Route>
    {props.loggedIn ? <Component {...props} /> : <Redirect to='./' />}
  </Route>
);

ProtectedRoute.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};

export default ProtectedRoute;
