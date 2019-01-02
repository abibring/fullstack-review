import React, { Component } from 'react';
import { Button } from 'react-bootstrap';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { input: '' };
  }

  render() {
    const { input } = this.state;
    const { handleSubmit, repos, getSearchedRepo } = this.props;
    return (
      <React.Fragment>
        <input type="text" onChange={(e) => this.setState({ input: e.target.value })} />
        <Button onClick={(e) => handleSubmit(e, input)}>Get Repo News</Button>
        <br />
        <span>
          {repos.map(repo => (
            <div key={repo.id}>
              <a href="#" onClick={(e) => getSearchedRepo(e, repo.full_name)}>{repo.full_name}</a>
            </div>
          ))}
        </span>
      </React.Fragment>
    )
  }
}