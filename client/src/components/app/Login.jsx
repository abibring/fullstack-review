import React from 'react';
import { Button } from 'react-bootstrap';


const Login = () => {
  let clientId = process.env.GITHUB_CLIENT_ID || 'fd744291ef509a6a54cc';
  return (
    <Button
      href={`https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user%20repo%20notifications`}
      bsStyle="primary"
      className="login-button"
    >
    {console.log('CLIENT ID', clientId)}
      Sign In With Github
    </Button>
  );
}

export default Login;