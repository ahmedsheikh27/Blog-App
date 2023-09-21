import React, { useState } from "react";
import { BrowserRouter,Link, Route, Routes } from "react-router-dom";
import "./navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faBars, faBlog } from '@fortawesome/free-solid-svg-icons';
import Home from '../pages/Home'
import About from '../pages/About'
import Register from "../pages/Register";
import SignIn from "../pages/SignIn";
import Post from "../posts/Post";
import ContactUs from "../pages/ContactUs";



function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  return (
      <>
      <BrowserRouter>
      <nav className="navbar">
        <div className="nav-container">
          <Link exact to="/" className="nav-logo">
            <FontAwesomeIcon icon={faBlog} />
          </Link>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                exact
                to="/about"
                activeClassName="active"
                className="nav-links"
              >
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                exact
                to="/blog"
                activeClassName="active"
                className="nav-links"
              >
                Blog
              </Link>
            </li>
            <li className="nav-item">
              <Link
                exact
                to="/ContactUs"
                activeClassName="active"
                className="nav-links"
              >
                Contact Us
              </Link>
            </li> 

            {/* <li className="nav-item">
              <Link
                exact
                to="/SignIn"
                activeClassName="active"
                className="nav-links"
              >
               Add User
              </Link>
            </li> */}
             <li className="nav-item">
              <Link
                exact
                to="/SignIn"
                activeClassName="active"
                className="nav-links"
                >
               Login
              </Link>
            </li>
              
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            {
                click?
                <FontAwesomeIcon icon={faCircleXmark} />
                :
                <FontAwesomeIcon icon={faBars} />
            }
          </div>
        </div>
      </nav>
      <Routes >
          <Route element={<Home />} path='/' />
          <Route element={<About />} path='/About' />
          <Route element={<SignIn />} path='/SignIn' />
          <Route element={<Register />} path='/Register' />
          <Route element={<Post />} path='/Post' />
          <Route element={<ContactUs />} path="/ContactUs" />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default Navbar;