import React, { Component } from 'react';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = { repos: [] };
    this.filterReposByName = this.filterReposByName.bind(this);
  }
  componentDidMount() {
    this.filterReposByName()
  }
  filterReposByName() {
    const { repos } = this.props;
    let repoNames = Promise.all(repos.map(repo => repo.html_url.split('/')[3]));
    repoNames
      .then(repos => this.setState({ repos }))
      .catch(e => console.error('err in filterRepoNames', e));
  }
  render() {
    const { repos } = this.state;
    return (
      <div>
        {console.log('PROPS', this.props.repos)}
        {console.log('STATE', repos)}
        <ButtonToolbar>
          <DropdownButton title="Sort by repo" id="dropdown-size-medium">
            {repos.map((repo, i) => (
              <MenuItem eventKey={i+1} key={i}>{repo}</MenuItem>
            ))}
          </DropdownButton>
        </ButtonToolbar>
      </div>
    );
  }
}