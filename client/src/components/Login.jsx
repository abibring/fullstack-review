import React from 'react';
import { Button } from 'react-bootstrap';

const Login = () => (
  <Button
    href={`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user%20repo%20notifications`}
    bsStyle="primary"
  >
    Sign In With Github
  </Button>
)

export default Login;