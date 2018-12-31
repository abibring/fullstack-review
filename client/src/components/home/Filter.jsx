import React, { Component } from 'react';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = { repos: [], name: 'Filter By Repo Name' };
    this.filterReposByName = this.filterReposByName.bind(this);
  }

  componentDidMount() {
    setTimeout(this.filterReposByName, 2000);
  }

  filterReposByName() {
    const { repos } = this.props;
    let repoNames = repos.map(repo => repo.html_url.split('/')[3]);
    let reposMinusDuplicates = [];
    let hash = {};
    repoNames.map(repo => {
      if (!hash[repo]) {
        hash[repo] = true;
        reposMinusDuplicates.push(repo);
      }
    });
    this.setState({ repos: reposMinusDuplicates });
  }
  render() {
    const { repos, name } = this.state;
    const { onSelect } = this.props;
    return (
      <div>
        <ButtonToolbar>
          <DropdownButton title={name} id="dropdown-size-medium">
            {repos.map((repo, i) => (
              <MenuItem eventKey={repo} key={i} onSelect={(e) => {
                onSelect(e)
                this.setState({ name: e })
              }}>{repo}</MenuItem>
            ))}
          </DropdownButton>
        </ButtonToolbar>
      </div>
    );
  }
}