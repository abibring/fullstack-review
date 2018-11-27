import React, { Component } from 'react';
import { Navbar, NavItem, Nav } from 'react-bootstrap';

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { signOut } = this.props;
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">The Better Github Feed</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavItem eventKey={1} href="#" onClick={signOut}>
            Sign Out
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
