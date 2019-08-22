import React, { Component } from 'react';
import Home from './Home.jsx';
import Login from './Login.jsx';
import { Route } from 'react-router-dom';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { userToken: '' };
  }
  componentDidMount() {
    const { history } = this.props;
    let token = localStorage.getItem('userToken').slice(13);
    console.log('token in App.jsx', token);
    if (token && token !== 'invalid') {
      this.setState({ userToken: token });
      history.push('/home');
    }
  }
  render() {
    const { userToken } = this.state;
    return (
      <div>
        <h1>Github Repo News</h1>
        <Route path="/" exact component={Login} />
        <Route path="/home" component={Home} userToken={userToken}/>
      </div>
    );
  }
}
