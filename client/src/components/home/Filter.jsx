import React, { Component } from 'react';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = { name: 'Filter Repos' };
  }

  render() {
    const { name } = this.state;
    const { onSelect, names, searched } = this.props;
    return (
      searched.length === 0
      ?
      <div className="filter">
        <ButtonToolbar>
          <DropdownButton title={name} id="dropdown-size-medium">
            {names.map((repo, i) => (
              <MenuItem eventKey={repo} key={i} onSelect={(e) => {
                onSelect(e)
                this.setState({ name: e })
              }}>{repo}</MenuItem>
            ))}
            <MenuItem divider />
            <MenuItem eventKey={'Show all'} onSelect={(e) => {
              onSelect(e)
              this.setState({ name: 'Showing All' })
            }}>View All</MenuItem>
          </DropdownButton>
        </ButtonToolbar>
      </div>
      :
      <div />
    );
  }
}