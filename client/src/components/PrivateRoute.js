import React from 'react';
import { Route, Redirect } from 'react-router-dom';
function PrivateRoute({ token, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return token ? children : <Redirect to={{ pathname: "/signin", state: { from: location } }} />
      }}
    />
  );
};
export default PrivateRoute;