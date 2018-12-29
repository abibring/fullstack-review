import React, { Component } from 'react';
import axios from 'axios';
import HomeFeed from './HomeFeed.jsx';
import NavigationBar from '../NavigationBar.jsx';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { starred: [], isAuthenticated: false, isLoading: true };
    this.signOut = this.signOut.bind(this);
    this.getStarred = this.getStarred.bind(this);
    this.confirmRedirect = this.confirmRedirect.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    const userToken = window.localStorage.getItem('userToken');
    if (!userToken || userToken === 'invalid') {
      history.push('/');
    } else {
      this.setState({ isAuthenticated: true }, () => this.getStarred());
    }
  }
  
  confirmRedirect() {
    window.onbeforeunload = () => {
      return 'You will be leaving githubfeed.com. Is that what you would like?'
    }
  }

  signOut() {
    const { history } = this.props;
    axios.get('/logout')
      .then(() => {
        window.localStorage.clear();
        this.setState({ isAuthenticated: false });
        history.push('/');
      })
      .catch(() => history.push('/'));
    }
    
    getStarred() {
      const userToken = window.localStorage.getItem('userToken');
      axios.get('/user/starred', { params: { userToken }})
        .then(({ data }) => this.setState({ starred: data, isLoading: false }))
        .catch(err => console.error(`err in componentDidMount: ${err}`));
    }

  render() {
    const { starred, isLoading } = this.state;
    const { history } = this.props;
    return (
      <div className="main">
        <NavigationBar history={history} signOut={this.signOut} />
        <HomeFeed isLoading={isLoading} leave={this.confirmRedirect} starred={starred}/>
      </div>
    );
  }
}
