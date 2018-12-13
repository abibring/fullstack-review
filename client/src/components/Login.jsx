import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class Login extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Button
          href={`https://github.com/login/oauth/authorize?client_id=fd744291ef509a6a54cc&scope=user%20repo%20notifications`}
          bsStyle="primary"
        >
        {console.log(process.env.GITHUB_CLIENT_ID)}
          Sign In With Github
        </Button>
    );
  }
}