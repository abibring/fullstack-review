import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { throws } from 'assert';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { input: '', repo: '' };
    this.userToken = window.localStorage.getItem('userToken');
    this.handleStarringRepo = this.handleStarringRepo.bind(this);
    this.keyPress = this.keyPress.bind(this);
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

  keyPress(e) {
    const { handleSubmit } = this.props;
    if (e.keyCode === 13) {
      console.log('target', e.target.value)
      handleSubmit(e, e.target.value);
    }
  }

  render() {
    const { input } = this.state;
    const { handleSubmit, repos, getSearchedRepo, resetRepos, hideSearch, handleResetFeed } = this.props;
    return (
      !hideSearch
      ?
      <div className="search-box">
        <input className="search-input" type="text" onKeyDown={this.keyPress} onChange={(e) => this.setState({ input: e.target.value })} />
        <Button className="search-btn" onClick={(e) => handleSubmit(e, input)}>Get Repo News</Button>
        {repos.length > 0 ? <Button onClick={resetRepos}>Reset Feed</Button> : ''}
        {/* {repos.length > 0 ? <Button onClick={this.handleStarringRepo}>Star Repo</Button>: ''} */}
      </div>
      :
      ''      
    )
  }
}