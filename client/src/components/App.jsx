import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { withCookies } from 'react-cookie';
import Home from './home/Home.jsx';
import LandingPage from './LandingPage.jsx';
import Footer from './Footer.jsx';
require('dotenv').config();

class App extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { history } = this.props;
    let token = window.localStorage.getItem('userToken') ? window.localStorage.getItem('userToken') : 'invalid';
    console.log('token in App:', token);
    if (token && token !== 'invalid') {
      history.push('/home');
    }
  }
  render() {
    const { cookies } = this.props;
    return (
      <div>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/home" render={(props) => <Home {...props} cookies={cookies} />} />
        </Switch>
        <Footer />
      </div>
    );
  }
}
export default withCookies(App);