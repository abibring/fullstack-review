import React, { Component } from 'react';
import { Navbar, NavItem, Nav, Button } from 'react-bootstrap';

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { signOut } = this.props;
    return (
      <Navbar className="navbar">
        <Navbar.Header style={{ paddingTop: 5 }}>
            <div style={{ color: 'white' }}>Made with &hearts; </div>
            <div style={{ color: 'white' }}>by <a href="https://github.com/abibring/"><strong>Alon Bibring</strong></a> in NYC.</div>
        </Navbar.Header>
        <Nav>
          <NavItem style={{ color: 'white' }}>
            GithubFeed
            Github updates you care about.
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={1} href="#" onClick={signOut} >
            <Button style={{ backgroundColor: '#39927A', color: 'white' }}>Sign Out</Button>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
