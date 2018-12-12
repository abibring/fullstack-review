import React, { Component } from 'react';
import { Navbar, NavItem, Nav, Image } from 'react-bootstrap';
import logo from '../../dist/img/logo.png';

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
            <img src={logo} style={{ width: 260, height: 80 }} alt="logo"/>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavItem eventKey={1} href="#" onClick={signOut} bsStyle="pills">
            Sign Out
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
