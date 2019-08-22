import React, { Component } from 'react';
import { GITHUB_CLIENT_ID } from '../../../config.js';

export default class Login extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Welcome to GitHub Repo Checker</h1>
        <h3>Please SignIn using GitHub</h3>
        <a 
          href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user`}
        >
          Sign In With Github
        </a>
      </div>
    );
  }
}