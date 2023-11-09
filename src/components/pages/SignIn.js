import React, { useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
  setPersistence,
  browserSessionPersistence,
  signInWithPopup
} from 'firebase/auth';
import { auth, provider } from '../config/Firebasa';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import {
  TextField, Button, Typography, Card, CardContent, Avatar,
  InputAdornment,
  IconButton,
} from '@mui/material';

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
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        // Sign in with email and password
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
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const GoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user
      console.log(user)
    }
    catch (error) {
      console.error(error)
    }
  }
  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleTogglePasswordVisibility = () => {
    setState({
      ...state,
      showPassword: !state.showPassword,
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
        <Card sx={{
          maxWidth: '300px',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '20px'
        }}>
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
        <Card variant="outlined"
          sx={{
            maxWidth: '430px',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '20px',
            borderRadius: '10px',
            background: '#f3f4f7'
          }}>
          <CardContent>
            <Typography variant="h6" align="center" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
              Welcome Back
            </Typography>
            <Avatar sx={{ width: 96, height: 96, margin: '0 auto',color:'yellow' }}>
              <FontAwesomeIcon icon={faSmile} size="2x" />
            </Avatar>
            <TextField
              id="name"
              name="name"
              label="Your Name"
              placeholder="First and Last name"
              onChange={handleChange}
              value={state.name}
              fullWidth
              margin="normal"
            />
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email address"
              placeholder="Your email address"
              onChange={handleChange}
              value={state.email}
              fullWidth
              margin="normal"
            />
            <TextField
              id="password"
              name="password"
              type={state.showPassword ? 'text' : 'password'}
              label="Password"
              placeholder="Your password"
              onChange={handleChange}
              value={state.password}
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                      <FontAwesomeIcon icon={state.showPassword ? faEye : faEyeSlash} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <div style={{
              display: 'flex', justifyContent: 'center', marginBottom: '10px',
              marginTop: '10px'
            }}>
              <Button
                style={{
                  color: 'white',
                  background: 'blue',
                  borderRadius: '5px',
                  width: '150px'
                }}
                size="large"
                onClick={handleSignIn}
              >
                Submit
              </Button>
            </div>
            <Typography variant="body1" align="center">
              Or,Continue with Google
            </Typography>
            <div className='google-button'>
              <FontAwesomeIcon icon={faGoogle}
                onClick={GoogleSignIn}
                className='google-icon' />
              <p className='icon-text'>SignIn </p>
            </div>
            <Typography variant="body1" align="center">
              Don't Have An Account?{' '}
              <Link to="/Register" className="fw-bold text-decoration-none">
                Register
              </Link>
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SignIn;
