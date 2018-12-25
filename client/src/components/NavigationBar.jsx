import React, { Component } from 'react';
import { Navbar, NavItem, Nav, Button, Image } from 'react-bootstrap';

export default class NavigationBar extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { signOut } = this.props;
    const userAvatar = window.localStorage.getItem('avatar');
    const userName = window.localStorage.getItem('username');
    return (
      <Navbar className="navbar">
        <Nav>
          <NavItem>
            <div style={{ color: 'white' }}>Made with &hearts; </div>
            <div style={{ color: 'white' }}>by <a href="https://github.com/abibring/"><strong>Alon Bibring</strong></a> in NYC.</div>
          </NavItem>
        </Nav>
        <Nav>
          <NavItem >
            <div style={{ color: 'white' }}>GithubFeed</div>
            <div style={{ color: 'white' }}>Github updates you care about.</div>
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={1} href="#">
            <div style={{ color: 'white' }}>@{userName}</div>
            <button className="signout" onClick={signOut}>Sign Out</button>
          </NavItem>
          <NavItem>
            <Image src={userAvatar} className="user-pic"/>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
