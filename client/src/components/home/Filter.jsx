import React, { Component } from 'react';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = { repos: [] };
  }
  filterReposByName() {
    const { repos } = this.props;
    const repoNames = [];
    for (let i = 0; i < repos.length; i++) {
      let repo = repos[i];
      repoNames.push(repo.html_url.split('/')[3]);
    }
    this.setState({ repos: repoNames });
  }
  render() {
    const { repos } = this.state;
    return (
      <div>
        <ButtonToolbar>
          <DropdownButton title="Default button" id="dropdown-size-medium">
            {repos.map((repo, i) => (
              <MenuItem eventKey={i+1} key={i}>{repo}</MenuItem>
            ))}
          </DropdownButton>
        </ButtonToolbar>
      </div>
    );
  }
}