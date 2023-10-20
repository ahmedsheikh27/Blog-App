import React, { useState, useEffect } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark, faBars } from '@fortawesome/free-solid-svg-icons';
import Home from '../pages/Home'
import About from '../pages/About'
import Register from "../pages/Register";
import SignIn from "../pages/SignIn";
import Post from "../posts/Post";
import Addpost from "../../components/pages/AddPost";
import logo from '../assets/logo.png'
import { auth } from '../config/Firebasa';
import { onAuthStateChanged } from "firebase/auth";
import { Avatar } from "@mui/material";

function Navbar() {
  const [click, setClick] = useState(false);
  const [user, setUser] = useState(null)

  const handleClick = () => setClick(!click);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user)
        // ...
      } else {
        setUser(null)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <>

      <BrowserRouter>
      <nav className="navbar">
      <div className="nav-container">
        <Link exact to="/" className="nav-logo">
          <img src={logo} className="logo" alt="Logo" />
        </Link>

        <div className="nav-icon" onClick={handleClick}>
          {
            click ?
              <FontAwesomeIcon icon={faCircleXmark} />
              :
              <FontAwesomeIcon icon={faBars} />
          }
        </div>

        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link exact to="/" activeClassName="active" className="nav-links">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link exact to="/about" activeClassName="active" className="nav-links">
              About
            </Link>
          </li>
          <li className="nav-item">
            <Link exact to="/AddPost" activeClassName="active" className="nav-links">
              AddPost
            </Link>
          </li>
          <li className="nav-item">
            {user ? (
              <Link to="/SignIn" className="nav-links">
                <Avatar
                  alt={user.displayName}
                  src={user.photoURL}
                  sx={{
                    width: 30,
                    height: 30
                  }}
                />
              </Link>
            ) : (
              <Link to="/SignIn" className="nav-links">
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
        <Routes >
          <Route element={<Home />} path='/' />
          <Route element={<About />} path='/About' />
          <Route element={<SignIn />} path='/SignIn' />
          <Route element={<Register />} path='/Register' />
          <Route element={<Post />} path='/Post' />
          <Route element={<Addpost />} path="/AddPost" />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Navbar;