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
          <NavItem eventKey={1} href="https://github.com/abibring/">
            <div style={{ color: 'white' }}>Made with &hearts; </div>
            <div style={{ color: 'white' }} onClick={}>
              by {'  '}
              <a href="https://github.com/abibring/" style={{ color: 'white' }}>
                Alon Bibring
              </a> 
              {'  '}
              in NYC.
            </div>
          </NavItem>
        </Nav>
        <Nav>
          <NavItem >
            <div style={{ color: 'white' }}>GithubFeed</div>
            <div style={{ color: 'white', fontSize: 12 }}>Github updates you care about.</div>
          </NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={2} href="#">
            <div style={{ color: 'white', opacity: .7 }}>@{userName}</div>
            <button className="signout" onClick={signOut}>{'    '}Sign Out</button>
          </NavItem>
          <NavItem>
            <Image src={userAvatar} className="user-pic"/>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}
