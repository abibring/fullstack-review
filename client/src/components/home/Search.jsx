import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { input: '', repo: '' };
    this.userToken = window.localStorage.getItem('userToken');
    this.handleStarringRepo = this.handleStarringRepo.bind(this);
  }

  handleStarringRepo(e) {
    e.preventDefault();
    const { repoInfo, getStarredRepos } = this.props;
    axios.put('/user/add/starred',  { repoInfo: repoInfo, userToken: this.userToken })
      .then(({ data }) => {
        // console.log('AFTER SUCCESSFUL PUT', data)
        getStarredRepos();
      })
      .catch(e => console.error('err in put', e));
  }

  render() {
    const { input } = this.state;
    const { handleSubmit, repos, getSearchedRepo, resetRepos } = this.props;
    return (
      <React.Fragment>
        <input type="text" onChange={(e) => this.setState({ input: e.target.value })} />
        <Button onClick={(e) => handleSubmit(e, input)}>Get Repo News</Button>
        {repos.length > 0 ? <Button onClick={resetRepos}>Reset Feed</Button> : ''}
        {/* {repos.length > 0 ? <Button onClick={this.handleStarringRepo}>Star Repo</Button>: ''} */}
        <br />
        <span>
          {repos.map(repo => (
            <div key={repo.id}>
              <a href="#" onClick={(e) => {
                getSearchedRepo(e, repo.full_name)
                this.setState({ input: '' })
                }}>{repo.full_name}</a>
            </div>
          ))}
        </span>
      </React.Fragment>
    )
  }
}