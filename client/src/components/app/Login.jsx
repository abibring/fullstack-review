import React from 'react';
import { Button } from 'react-bootstrap';

const Login = () => (
  <Button
    href={`https://github.com/login/oauth/authorize?client_id=c1b01256656b3ebf6d23&scope=user%20repo%20notifications`}
    bsStyle="primary"
    className="login-button"
  >
    Sign In With Github
  </Button>
)

export default Login;


// fd744291ef509a6a54cc
