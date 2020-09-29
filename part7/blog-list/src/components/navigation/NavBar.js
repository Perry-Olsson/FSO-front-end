import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../reducers/userReducer';
import { clearNotification } from '../../reducers/notificationReducer';
import { Link } from 'react-router-dom';
import { Button, Navbar, Nav } from 'react-bootstrap';

const NavBar = ({ user }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearNotification());
    dispatch(logoutUser());
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      style={{ margin: '1em 0' }}
      bg="dark"
      variant="light"
    >
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#" as="div">
            <Link style={{ color: 'white' }} to="/">
              Blogs
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="div">
            <Link style={{ color: 'white' }} to="/users">
              Users
            </Link>
          </Nav.Link>
        </Nav>
        <Nav>
          <Nav.Link href="#" style={{ color: 'white', marginRight: '1em' }}>
            logged in as {user.username}
          </Nav.Link>
          <Button
            className="logout"
            onClick={handleLogout}
            variant="outline-light"
          >
            logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
