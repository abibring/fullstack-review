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
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <img src={logo} style={{ width: 260, height: 80, border: '10%' }} alt="logo"/>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavItem eventKey={1} href="#" onClick={signOut} >
            <Button style={{ backgroundColor: '#8860D0' }}>Sign Out</Button>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
