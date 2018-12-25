import React, { Component } from 'react';
import { Navbar, NavItem, Nav, Button } from 'react-bootstrap';
import logo from '../../dist/img/new_logo.png';

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { signOut } = this.props;
    return (
      <Navbar className="navbar">
        <Navbar.Header>
          <Navbar.Brand>
            <div style={{ color: 'white' }}>Made with &hearts; </div>
            <div style={{ color: 'white' }}>by <a href="https://github.com/abibring/"><strong>Alon Bibring</strong></a> in NYC.</div>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavItem eventKey={1} href="#" onClick={signOut} >
            <Button style={{ backgroundColor: '#39927A', color: 'white' }}>Sign Out</Button>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
