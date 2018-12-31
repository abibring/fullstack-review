import React from 'react';
import { Navbar, NavItem, Nav, Image } from 'react-bootstrap';
import logo from '../../../dist/img/githubfeed_logo.png';

const NavigationBar = ({ signOut }) => {
  const userAvatar = window.localStorage.getItem('avatar');
  const username = window.localStorage.getItem('username');
  const whiteFont = { color: 'white' };
  return (
    <Navbar className="navbar">
      <Navbar.Brand>
        <Image src={logo} alt="logo" />
      </Navbar.Brand>
      <Nav>
        <NavItem eventKey={1} href="https://www.linkedin.com/in/alon-bibring-45117458/" style={{ opacity: .7 }}>
          <div style={whiteFont}>Made with &#9825; </div>
          <div style={whiteFont}>
            by <i style={{ textDecoration: 'underline' }}>Alon Bibring</i> in NYC.
          </div>
        </NavItem>
      </Nav>
      <Nav>
        <NavItem >
          <div style={{ color: 'white', fontSize: 14 }}>GithubFeed</div>
          <div style={{ color: 'white', fontSize: 12, opacity: .7 }}>Github updates you care about.</div>
        </NavItem>
      </Nav>
      <Nav pullRight>
        <NavItem eventKey={2} href="#" className="nav-user-info">
          <div className="nav-username">@{username}</div>
          <button className="nav-signout" onClick={signOut}>{'    '}Sign Out</button>
        </NavItem>
        <NavItem>
          <Image src={userAvatar} className="user-pic"/>
        </NavItem>
      </Nav>
  </Navbar>
  );
}

export default NavigationBar;
