import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, sendEmailVerification } from 'firebase/auth';
import { auth } from '../config/Firebasa';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ListSubheader } from '@mui/material/List';
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { Avatar, Card, CardContent, Typography, Button } from '@mui/material';

import './page.css';

const initialState = { name: '', email: '', password: '', imageUrl: '' };

const SignIn = () => {
  const [state, setState] = useState(initialState);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSignIn = () => {
    const { email, password, name, imageUrl } = state;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Set the user's display name and photo URL
        updateProfile(user, { displayName: name, photoURL: imageUrl })
          .then(() => {
            setUser(user);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // const handleEmailVerification = () => {
  //   sendEmailVerification(auth.currentUser)
  //     .then(() => {
  //       console.log('Email Verified');
  //     });
  // };

  return (
    <div>
      {user ? (
          <Card>
          <CardContent>
            <Avatar
              alt={user.displayName}
              src={user.photoURL}
              sx={{ width: 100, height: 100, margin: '0 auto' }}
            />
            <Typography variant="h5" component="div" sx={{ textAlign: 'center', mt: 2 }}>
              {user.displayName}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ textAlign: 'center' }}>
              {user.email}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSignout}
              sx={{ display: 'block', margin: '20px auto' }}
            >
              Sign Out
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="d-flex justify-content-center flex-column input-feild">
          <h1 className="mt-3 mb-3 text-center text-danger">Login</h1>
          <form className="input-field">
            <div className="fw-bold text-warning font-poppins text-center">
              <h5>Welcome Back</h5>
              <FontAwesomeIcon className="fs-1" icon={faFaceSmile} />
            </div>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="First and Last name"
                onChange={handleChange}
                className="form-control p-3"
                id="name"
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                onChange={handleChange}
                className="form-control p-3"
                id="email"
              />
              <div className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control p-3"
                placeholder="Your password"
                id="password"
                name="password"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="check"
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="check">
                Check me out
              </label>
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-outline-warning d-flex justify-content-center text-dark fw-bold"
                onClick={handleSignIn}
              >
                Submit
              </button>
            </div>
            <p className="mt-3 text-center">
              Don't Have An Account?
              <Link to="/Register" className="fw-bold text-decoration-none">
                Register
              </Link>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignIn;
