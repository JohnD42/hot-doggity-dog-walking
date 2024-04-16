import React, { useState, useContext } from "react";
import { useMediaQuery } from 'react-responsive';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const MobileNav = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const handleLogout = async () => {
    try {
      await actions.logout();
      navigate("/");
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };
  const { store, actions } = useContext(Context);

  return isMobile && (

    <Navbar className="navbar-light bg-light" bg="body-tertiary" expand="d-md-none ">
      <Container>
        <Navbar.Brand href="#">
          {/*  */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="ms-auto">
            {!store.token ?
              <>
                <Nav.Link as={Link} to="/" className="nav-link active" style={{ color: 'black' }}>Home</Nav.Link>
                <Nav.Link as={Link} to="/signupUser" className="nav-link" style={{ color: 'black' }}>Sign up</Nav.Link>
                <Nav.Link as={Link} to="/insurance" className="nav-link" style={{ color: 'black' }}>Insurance</Nav.Link>
              </>
              :
              <>
                <Nav.Link as={Link} to="/" className="nav-link active" style={{ color: 'black' }}>Home</Nav.Link>
                <Nav.Link as={Link} to="/account" className="nav-link" style={{ color: 'black' }}>Account</Nav.Link>
                <Nav.Link as={Link} to="/insurance" className="nav-link" style={{ color: 'black' }}>Insurance</Nav.Link>
                <Nav.Link as={Link} to="/services" className="nav-link" style={{ color: 'black' }}>Services</Nav.Link>
                <Nav.Link as={Link} to='/' className="nav-link" style={{ color: 'black' }} onClick={handleLogout}>Log Out</Nav.Link>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
