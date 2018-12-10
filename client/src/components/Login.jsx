import React, { Component } from 'react';
// import { GITHUB_CLIENT_ID } from '../../../config.js';
import { Button } from 'react-bootstrap';
require('dotenv').config();

export default class Login extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <Button
          href={`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=user%20repo%20notifications`}
          bsStyle="primary"
        >
          Sign In With Github
        </Button>
    );
  }
}