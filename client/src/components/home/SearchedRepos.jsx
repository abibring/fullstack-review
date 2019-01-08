import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class SearchedRepos extends Component {
  render() {
    const { repos, getSearchedRepo, reposSearched, resetFeed } = this.props;
    return !reposSearched ? (
      <span>
        {repos.length > 1 ? (
          <div className="searched-repo-list">
            <span>
              {repos.map(repo => (
                <div key={repo.id}>
                  <a
                    href="#"
                    onClick={e => {
                      getSearchedRepo(e, repo.full_name);
                      this.setState({ input: '' });
                    }}
                  >
                    {repo.full_name}
                  </a>
                </div>
              ))}
            </span>
          </div>
        ) : (
          ''
        )}
      </span>
    ) : (
      <Button style={{ display: !reposSearched ? 'none' : 'block'}} onClick={resetFeed}>Reset Feed</Button>
    );
  }
}
