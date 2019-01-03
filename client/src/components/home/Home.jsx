import React, { Component } from 'react';
import axios from 'axios';
import HomeFeed from './HomeFeed.jsx';
import Filter from './Filter.jsx';
import NavigationBar from '../app/NavigationBar.jsx';
import Search from './Search.jsx';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {  
      isAuthenticated: false, 
      repos: [], 
      isLoading: true, 
      filterBy: '', 
      filteredRepos: [], 
      repoNames: [],
      repoSearchNames: [],
      searchedRepo: [],
      reset: false,
      repoInfo: '' 
    };
    // this.userToken = this.props.userToken;
    this.signOut = this.signOut.bind(this);
    this.getStarredRepos = this.getStarredRepos.bind(this);
    this.confirmRedirect = this.confirmRedirect.bind(this);
    this.getAssociatedRepos = this.getAssociatedRepos.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.handleRepoFilter = this.handleRepoFilter.bind(this);
    this.handleRepoSearch = this.handleRepoSearch.bind(this);
    this.getSearchedRepo = this.getSearchedRepo.bind(this);
    this.resetRepos = this.resetRepos.bind(this);
    this.userToken = window.localStorage.getItem('userToken');
  }

  componentDidMount() {
    const { history } = this.props;
    if (!this.userToken) {
      history.push('/');
    } else {
      this.setState({ isAuthenticated: true }, () => this.getStarredRepos());
    }
  }
  
  confirmRedirect() {
    window.onbeforeunload = () => { 
      return 'Sure?'; 
    };
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
  
  getStarredRepos() {
    this.setState({ isLoading: true })
    axios.get('/user/starred', { params: { userToken: this.userToken }})
    .then(({ data }) => this.setState({ repos: data, isLoading: false }, () => this.getAssociatedRepos() ))
    .catch(err => console.error(`err in componentDidMount: ${err}`));
  }
  
  getAssociatedRepos() {
    const { repos } = this.state;
    axios.get('/user/associated', { params: { userToken: this.userToken }})
    .then(({ data }) => {
      let allRepoData = [...repos, ...data];
      allRepoData = allRepoData.sort((a,b) => b.ranking - a.ranking);
      let repoNamesWithDups = [];
      allRepoData.map(repo => repoNamesWithDups.push(repo.html_url.split('/')[3]))
      let repoNamesUnique = [...new Set(repoNamesWithDups)];
      this.setState({ repos: allRepoData, repoNames: repoNamesUnique })
    })
    .catch(err => console.error('error with owned repos', err));
  }
  
  onSelect(e) {
    if (e === 'Show all') {
      this.setState({ filterBy: '' });
    } else {
      this.handleRepoFilter(e);
    }
  }

  handleRepoFilter(e) {
    const { repos } = this.state;
    this.setState({ filterBy: e, reset: false }, () => {
      let filtered = repos.filter(repo => repo.html_url.split('/')[3] === e);
      this.setState({ filteredRepos: filtered });
    })
  }

  handleRepoSearch(e, repo) {
    this.setState({ isLoading: true}, () => {
      axios.post('/user/search', { repo, userToken: this.userToken })
        .then(({ data }) => {
          this.setState({ isLoading: false, repoSearchNames: data.items, reset: false });
        })
        .catch(e => console.error('err in handleRepoSearch', e));
    })
  }

  getSearchedRepo(e, repoInfo) {
    e.preventDefault();
    console.log(typeof repoInfo)
    let owner = repoInfo.split('/')[0];
    let repo = repoInfo.split('/')[1];
    this.setState({ isLoading: true, reset: false, repoInfo }, () => {
      axios.get('user/search/repo', { params: { owner, repo, userToken: this.userToken }})
        .then(({ data }) => {
          this.setState({ searchedRepo: data, isLoading: false })
        })
        .catch(e => console.error('err in getSearchedRepos', e));
    })
  }

  resetRepos(e) {
    e.preventDefault();
    this.setState({ isLoading: true, reset: true, filterBy: '' })
    axios.get('/user/starred', { params: { userToken: this.userToken }})
    .then(({ data }) => this.setState({ repos: data, isLoading: false, searchedRepo: [], repoSearchNames: [], repoNames: [], filteredRepos: [] }, () => this.getAssociatedRepos() ))
    .catch(err => console.error(`err in componentDidMount: ${err}`));
  }
  
  render() {
    const { repos, isLoading, filteredRepos, filterBy, repoNames, repoSearchNames, repoInfo, searchedRepo, reset } = this.state;
    return (
      <div className="main">
        <NavigationBar signOut={this.signOut} />
        <Filter 
          repos={repos} 
          names={repoNames} 
          onSelect={this.onSelect} 
          filtered={filteredRepos} 
          searched={searchedRepo} 
        />
        {/* <Search 
          handleSubmit={this.handleRepoSearch} 
          repos={repoSearchNames} 
          getSearchedRepo={this.getSearchedRepo} 
          resetRepos={this.resetRepos} 
          repoInfo={repoInfo}
          getStarredRepos={this.getStarredRepos}
        /> */}
        <HomeFeed 
          isLoading={isLoading} 
          leave={this.confirmRedirect} 
          repos={filterBy !== '' && filteredRepos.length > 0 && searchedRepo.length === 0 ? filteredRepos : searchedRepo.length > 1 && reset === false ? searchedRepo : repos} 
        />
      </div>
    );
  }
}
