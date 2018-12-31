import React, { Component } from 'react';
import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';

export default class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = { name: 'Filter by repo' };
  }

  render() {
    const { name } = this.state;
    const { onSelect, names } = this.props;
    return (
      <div>
        <ButtonToolbar>
          <DropdownButton title={name} id="dropdown-size-medium">
            {names.map((repo, i) => (
              <MenuItem eventKey={repo} key={i} onSelect={(e) => {
                onSelect(e)
                this.setState({ name: e })
              }}>{repo}</MenuItem>
            ))}
            <MenuItem divider />
            <MenuItem eventKey={''} onSelect={(e) => {
              onSelect(e)
              this.setState({ name: e })
            }}>View All</MenuItem>
          </DropdownButton>
        </ButtonToolbar>
      </div>
    );
  }
}