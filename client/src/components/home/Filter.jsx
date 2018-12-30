import React, { Component } from 'react';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = { repos: [] };
    this.filterReposByName = this.filterReposByName.bind(this);
  }
  componentDidMount() {
    setTimeout(this.filterReposByName, 2000);
  }
  filterReposByName() {
    const { repos } = this.props;
    let repoNames = repos.map(repo => repo.html_url.split('/')[3]);
    let hash = {};
    let repoNamesRemoveDuplicates = [];
    repoNames.map(repo => {
      if (!hash[repo]) {
        hash[repo] = true;
        repoNamesRemoveDuplicates.push(repo);
      }
    });
    this.setState({ repos: repoNamesRemoveDuplicates });
  }

  render() {
    const { repos } = this.state;
    const { onSelect } = this.props;
    return (
      <div>
        <ButtonToolbar>
          <DropdownButton title="Sort by repo" id="dropdown-size-medium">
            {repos.map((repo, i) => (
              <MenuItem eventKey={repo} key={i} onSelect={onSelect}>{repo}</MenuItem>
            ))}
          </DropdownButton>
        </ButtonToolbar>
      </div>
    );
  }
}