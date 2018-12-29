import React from 'react';
import { Navbar, NavItem, Nav, Image } from 'react-bootstrap';

const NavigationBar = ({ signOut }) => {
  const userAvatar = window.localStorage.getItem('avatar');
  const username = window.localStorage.getItem('username');
  return (
    <Navbar className="navbar">
    <Nav>
      <NavItem eventKey={1} href="https://www.linkedin.com/in/alon-bibring-45117458/" style={{ opacity: .7 }}>
        <div style={{ color: 'white' }}>Made with &#9825; </div>
        <div style={{ color: 'white' }}>
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
