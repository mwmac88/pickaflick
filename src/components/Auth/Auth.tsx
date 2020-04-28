import React from 'react';
import { Router, RouteComponentProps } from '@reach/router';

import Login from './Login';
import Register from './Register';

interface Props extends RouteComponentProps {
  path: string;
}

const Auth: React.FC<Props> = () => {
  console.log('THIS IS AUTH');
  return (
    <Router>
      <Login path='/login' />
      <Register path='/register' />
    </Router>
  );
};

export default Auth;
