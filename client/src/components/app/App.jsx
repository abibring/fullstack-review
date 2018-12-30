import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../home/Home.jsx';
import LandingPage from './LandingPage.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.userToken = window.localStorage.getItem('userToken') || 'invalid';
  }
  componentDidMount() {
    const { history } = this.props;
    if (this.userToken && this.userToken !== 'invalid') {
      history.push('/home');
    }
  }
  render() {
    const { cookies } = this.props;
    return (
      <div>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/home" render={(props) => <Home {...props} />} />
        </Switch>
      </div>
    );
  }
};