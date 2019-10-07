import React, { Component } from 'react';
import axios from 'axios';
import HomeFeed from './HomeFeed.jsx';
import Filter from './Filter.jsx';
import NavigationBar from '../app/NavigationBar.jsx';
import Search from './Search.jsx';
import SearchedRepos from './SearchedRepos.jsx';

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
      repoInfo: '',
      options: [],
      reposSearched: false,
      hideFeed: false,
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
    this.handleResetFeed = this.handleResetFeed.bind(this);
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
    .then(({ data }) => {
      this.setState({ repos: data }, () => this.getAssociatedRepos() )
    })
    .catch(err => console.error(`err in componentDidMount: ${err}`));
  }
  
  async getAssociatedRepos() {
    const { repos } = this.state;
    console.log('THIS IS USER TOKEN', this.userToken)
   const associatedUsers = await axios.get('/user/associated', { params: { userToken: this.userToken }})
   console.log('\n associatedUsers', associatedUsers, '\n')
    // .then(({ data }) => {
    //   let allRepoData;
    //   console.log('DATA DATA', data)
    //   if (!data) {
    //     this.setState({ isLoading: false, repos: [] })
    //   } else if (data.length > 1) {
    //     allRepoData = [...repos, ...data];
    //   } else {
    //     allRepoData = repos.sort((a,b) => b.ranking - a.ranking);
    //   }
    //     const repoNamesWithDups = [];
    //     allRepoData.map(repo => repoNamesWithDups.push(repo.html_url && repo.html_url.split('/')[4]))
    //     const repoNamesUnique = [...new Set(repoNamesWithDups)];
    //     const promise = Promise.all(repoNamesUnique.map(repo => { 
    //       return { value: repo, label: repo }
    //     }));
    //     promise.then(options => {
    //       this.setState({ options })
    //     })
    //     this.setState({ repos: allRepoData, repoNames: repoNamesUnique, isLoading: false })
    // })
    // .catch(err => console.error('error with owned repos', err));
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
      let filtered = repos.filter(repo => repo.html_url.split('/')[4] === e);
      this.setState({ filteredRepos: filtered });
    })
  }

  handleRepoSearch(e, repo) {
    e.preventDefault();
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
    e.stopPropagation();
    let owner = repoInfo.split('/')[0];
    let repo = repoInfo.split('/')[1];
    this.setState({ isLoading: true, reset: false, repoInfo }, () => {
      axios.get('user/search/repo', { params: { owner, repo, userToken: this.userToken }})
        .then(({ data }) => this.setState({ searchedRepo: data, isLoading: false, reposSearched: true }))
        .catch(e => console.error('err in getSearchedRepos', e));
    })
  }

  resetRepos(e) {
    e.preventDefault();
    this.setState({ isLoading: true, reset: true, filterBy: '', hideFeed: false })
    axios.get('/user/starred', { params: { userToken: this.userToken }})
        .then(({ data }) =>
          this.setState({
            repos: data,
            isLoading: false,
            searchedRepo: [],
            repoSearchNames: [],
            repoNames: [],
            filteredRepos: []
          },
          () => this.getAssociatedRepos()
        )
      )
      .catch(err => console.error(`err in componentDidMount: ${err}`));
  }

  handleResetFeed(e) {
    e.preventDefault();
    this.getStarredRepos();
    this.setState({ reposSearched: true, hideFeed: false });
  }
  
  render() {
    const { 
      options, 
      repos, 
      isLoading, 
      filteredRepos, 
      filterBy, 
      repoNames, 
      repoSearchNames, 
      repoInfo, 
      searchedRepo, 
      reset,
      reposSearched,
      hideFeed
    } = this.state;
    return (
      <div className="main">
        {console.log('REPOS IN HOME', repos)}
        <NavigationBar signOut={this.signOut} />
        <Filter 
          repos={repos} 
          names={repoNames} 
          onSelect={this.onSelect} 
          filtered={filteredRepos} 
          searched={searchedRepo} 
          options={options}
        />
        <Search 
          handleSubmit={this.handleRepoSearch} 
          repos={repoSearchNames} 
          getSearchedRepo={this.getSearchedRepo} 
          resetRepos={this.resetRepos} 
          clearFeed={this.handleResetFeed}
          repoInfo={repoInfo}
          getStarredRepos={this.getStarredRepos}
          hideSearch={reposSearched}
        />
        <div className="searched-repo-div">
          <SearchedRepos
            repos={repoSearchNames} 
            getSearchedRepo={this.getSearchedRepo} 
            reposSearched={reposSearched} 
            resetFeed={this.handleResetFeed} 
          />
        </div>
        <div className="main-inner">
          <HomeFeed 
            isLoading={isLoading} 
            reposSearched={reposSearched}
            repos={
              filterBy !== '' &&
              filteredRepos.length > 0 &&
              searchedRepo.length === 0
              ? filteredRepos
              : searchedRepo.length > 1 && reset === false
              ? searchedRepo
              : repos
            }
          />
        </div>
      </div>
    );
  }
}
