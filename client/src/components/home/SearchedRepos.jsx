import React, { Component } from 'react';

export default class SearchedRepos extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { repos, getSearchedRepo } = this.props;
    return (
      <span>
        {repos.length > 1 
        ?
        <span className="searched-repo-list">
          {repos.map(repo => (
            <div key={repo.id}>
              <a href="#" onClick={(e) => {
                getSearchedRepo(e, repo.full_name)
                this.setState({ input: '' })
                }}>{repo.full_name}</a>
            </div>
          ))}
        </span>
        :
        ''}
    </span>
    );
  }
}