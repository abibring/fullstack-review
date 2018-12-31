import React, { Component } from 'react';
import axios from 'axios';
import HomeFeed from './HomeFeed.jsx';
import Filter from './Filter.jsx';
import NavigationBar from '../app/NavigationBar.jsx';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { repos: [], isAuthenticated: false, isLoading: true, filterBy: '' };
    this.userToken = this.props.userToken;
    this.signOut = this.signOut.bind(this);
    this.getStarred = this.getStarred.bind(this);
    this.confirmRedirect = this.confirmRedirect.bind(this);
    this.getReposCollab = this.getReposCollab.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    if (!this.userToken) {
      history.push('/');
    } else {
      this.setState({ isAuthenticated: true }, () => this.getStarred());
    }
  }
  
  confirmRedirect() {
    window.onbeforeunload = () => { return; };
  }
  
  signOut() {
    const { history } = this.props;
    axios.get('/logout')
    .then(() => {
      window.localStorage.clear();
      this.setState({ isAuthenticated: false }, () => history.push('/'));
    })
    .catch(() => history.push('/'));
  }
  
  getStarred() {
    this.setState({ isLoading: true })
    axios.get('/user/starred', { params: { userToken: this.userToken }})
    .then(({ data }) => this.setState({ repos: data, isLoading: false }, () => this.getReposCollab() ))
    .catch(err => console.error(`err in componentDidMount: ${err}`));
  }
  
  getReposCollab() {
    const { repos } = this.state;
    axios.get('/user/collab', { params: { userToken: this.userToken }})
    .then(({ data }) => {
      let allRepoData = [...repos, ...data];
      allRepoData = allRepoData.sort((a,b) => b.ranking - a.ranking);
      this.setState({ repos: allRepoData })
    })
    .catch(err => console.error('error with owned repos', err));
  }
  
  onSelect(e) {
    const { repos, filterBy } = this.state;
    let promise;
    if (filterBy.length > 0 && e !== filterBy) {
      promise = new Promise((reject, resolve) => {
        resolve(() => {
          this.setState({ filterBy: e });
          let results = [];
          repos.map(repo => {
            if (repo.html_url.split('/')[3] === e) {
              results.push(repo);
            }
          });
          this.setState({ repos: results });
        })
      });
    }
    if (promise) {
      this.getStarred();
      promise
        .then(() => console.log('promise successful'))
        .catch(e => console.error('err in promise', e));
    } else {
      this.setState({ filterBy: e });
      let results = [];
      repos.map(repo => {
        if (repo.html_url.split('/')[3] === e) {
          results.push(repo);
        }
      });
      this.setState({ repos: results });
    }
  }
  
  render() {
    const { repos, isLoading } = this.state;
    return (
      <div className="main">
        <NavigationBar signOut={this.signOut} />
        <Filter repos={repos} onSelect={this.onSelect} />
        <HomeFeed isLoading={isLoading} leave={this.confirmRedirect} repos={repos} />
      </div>
    );
  }
}
