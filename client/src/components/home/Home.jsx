import React, { Component } from 'react';
import axios from 'axios';
import HomeFeed from './HomeFeed.jsx';
import NavigationBar from '../NavigationBar.jsx';
import Filter from './Filter.jsx';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { repos: [], isAuthenticated: false, isLoading: true, filterBy: '' };
    this.userToken = window.localStorage.getItem('userToken')
    this.signOut = this.signOut.bind(this);
    this.getStarred = this.getStarred.bind(this);
    this.confirmRedirect = this.confirmRedirect.bind(this);
    this.getReposCollab = this.getReposCollab.bind(this);
    this.getReposOrg = this.getReposOrg.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    if (!this.userToken || this.userToken === 'invalid') {
      history.push('/');
    } else {
      this.setState({ isAuthenticated: true }, () => {
        this.getStarred();
        // this.getReposCollab();
        // this.getReposOrg();
      });
    }
  }

  onSelect(e) {
    const { repos, filterBy } = this.state;
    if (filterBy.length > 0 && e !== filterBy) {
      this.getStarred();
    }
    this.setState({ filterBy: e });
    let results = [];
    repos.map(repo => {
      if (repo.html_url.split('/')[3] === e) {
        results.push(repo);
      }
    });
    this.setState({ repos: results });
  }
  
  confirmRedirect() {
    window.onbeforeunload = () => {
      return;
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
      this.setState({ isLoading: true})
      axios.get('/user/starred', { params: { userToken: this.userToken }})
        .then(({ data }) => this.setState({ repos: data, isLoading: false }))
        .catch(err => console.error(`err in componentDidMount: ${err}`));
    }

    getReposCollab() {
      const { repos } = this.state;
      axios.get('/user/collab', { params: { userToken: this.userToken }})
        .then(({ data }) => this.setState({ repos: [...data, ...repos]}))
        .catch(err => console.error('error with owned repos', err));
    }

    getReposOrg() {
      axios.get('/user/org', { params: { userToken: this.userToken }})
        .then(({ data }) => console.log('ORG', data))
        .catch(err => console.error('ORG ERR', err));
    }

  render() {
    const { repos, isLoading } = this.state;
    const { history } = this.props;
    return (
      <div className="main">
        <NavigationBar history={history} signOut={this.signOut} />
        <Filter repos={repos} onSelect={this.onSelect} />
        <HomeFeed isLoading={isLoading} leave={this.confirmRedirect} repos={repos} />
      </div>
    );
  }
}
