import React from 'react';
import { Jumbotron } from 'react-bootstrap';
import Login from './Login.jsx';
import landingPage from '../../../dist/img/landingPage.jpg';

const LandingPage = () => (
  <Jumbotron className="jumbotron">
    <div className="jumbotron-content">
      <h1 style={{ color: '#39927A' }}>The Useful Github Feed</h1>
      <p>
        This is a useful news feed for Github.  Find out the latest updates about repos you
        are watching, have starred, or are affiliated with.  Get the latest information about your repos, 
        such as pull requests, issues, new releases, and more! Sign in with your Github credentials to get started.
      </p> <br />
      <div>
        <Login />
      </div>
    </div>
  </Jumbotron>
);

export default LandingPage;