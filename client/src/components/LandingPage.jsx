import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

export default class LandingPage extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Jumbotron className="jumbotron">
        <h1 style={{ paddingLeft: 12 }}>The Useful Github Feed</h1>
        <p style={{ fontSize: 25, width: 500, height: 500 }}>
          This is a better version of the Github feed, which allows you to track the latest information
          about repos you are watching, contributing to, or using.  Get the latest information about any updates,
          such as pull requests, commits, issues, new repos, and more! Sign in with your Github credentials to get started!
        </p> <br />
        <div style={{ paddingLeft: 10 }}>
          <Login />
          {/* <Signup /> */}
        </div>
      </Jumbotron>
    );
  }
}