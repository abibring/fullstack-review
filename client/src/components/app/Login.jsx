import React from 'react';
import { Button } from 'react-bootstrap';
import dotenv from 'dotenv'
dotenv.config();
const Login = () => (
  <Button
    href={`https://github.com/login/oauth/authorize?client_id=fd744291ef509a6a54cc&scope=user%20repo%20notifications`}
    bsStyle="primary"
    className="login-button"
  >
  {console.log('PROCESS', process.env)}
    Sign In With Github
  </Button>
)

export default Login;