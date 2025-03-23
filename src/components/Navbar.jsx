import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';

const MyNavbar = () => {
  const firebase = useFirebase();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await firebase.logoutUser();
    navigate('/login');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleHome = () => {
    navigate('/home');
  };

  return (
    <Navbar style={{ backgroundColor: '#0C6DFD' }} variant="dark" expand="lg">
      <Container>
        <Navbar.Brand style={{ cursor: 'pointer', color: '#fff' }} onClick={handleHome}>BookStore</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={handleHome} className="nav-hover" style={{ color: '#fff' }}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate('/book/list')} className="nav-hover" style={{ color: '#fff' }}>Add Listing</Nav.Link>
            <Nav.Link onClick={() => navigate('/profile')} className="nav-hover" style={{ color: '#fff' }}>Profile</Nav.Link>
          </Nav>
          {firebase.isLoggedIn ? (
            <Button variant="danger" onClick={handleLogout}>Logout</Button>
          ) : (
            <Button style={{ backgroundColor: 'transparent', color: '#fff', border: '1px solid #fff' }} onClick={handleLogin}>
              Login
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
      
    </Navbar>
  );
};

export default MyNavbar;
