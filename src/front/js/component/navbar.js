

// import dogwalklogo from '../../img/dogwalklogo.png'
import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom";
export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set the initial state to false
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const handleLogout = async () => {
    try {
      await actions.logout();
      setIsLoggedIn(false); // Set isLoggedIn to false on logout
      navigate("/");
    } catch (error) {
      console.error('An error occurred during logout:', error);
    }
  };

  return (
    <>
      <div className="number-Desk d-none d-md-block">
        (123)456-7891
        <br></br>
        Hotdoggitydogwalker@gmail.com
      </div>

      <nav className="navbar-Desk navbar navbar-expand-lg navbar-light bg-light d-none d-md-flex">
        <img className="logoImg-Desk" src="https://cdn.pixabay.com/photo/2022/08/10/03/30/cat-7376274_1280.png" />
        <div className="d-flex justify-content-center text-center ">
          <div className="logoTitle-Desk d-flex justify-content-start" >
            <h2 className="title-Desk">Hot Doggity Dog Walkers</h2>
          </div>
        </div>
        <div className="collapse navbar-collapse" id="navbarNav">
          {!store.token ?
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/signupUser">Sign Up <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link to="/insurance" className="nav-link  " aria-disabled="true" style={{ color: 'black' }}>Insurance</Link>
              </li>
            </ul>
            :
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Home <span className="sr-only">(current)</span></Link>
              </li>
              <li className="nav-item">
                <Link to="/account" className="nav-link " style={{ color: 'black' }}>Account</Link>
              </li>
              <li className="nav-item">
                <Link to="/services" className="nav-link " style={{ color: 'black' }}>Services</Link>
              </li>
              <li className="nav-item">
                <Link to="/insurance" className="nav-link  " aria-disabled="true" style={{ color: 'black' }}>Insurance</Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link " onClick={handleLogout} aria-disabled="true" style={{ color: 'black' }}>Log Out</Link>
              </li>
            </ul>
          }
        </div>
      </nav>
    </>
  )
};

















