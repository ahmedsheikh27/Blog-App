import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../config/Firebasa';
import { Link } from 'react-router-dom';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { storage } from '../config/Firebasa';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Avatar,
  InputAdornment,
  IconButton,
} from '@mui/material';
import './page.css';

const initialState = { name: '', email: '', password: '', imageFile: null };

const Register = () => {
  const [state, setState] = useState([initialState]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setState({ ...state, imageFile: file });
  };

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, name, imageFile } = state;

    try {
      // Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Upload the image file to Firebase Storage
      if (imageFile) {
        const imageRef = ref(storage, `images/${user.uid}/${imageFile.name}`);
        await uploadBytes(imageRef, imageFile);
        const imageUrl = await getDownloadURL(imageRef);

        // Set the user's display name and photo URL
        await updateProfile(user, { displayName: name, photoURL: imageUrl });

        // Store the user's data in Firestore
        const db = getFirestore();
        const usersRef = collection(db, 'users');
        await addDoc(usersRef, {
          name: name,
          email: email,
          imageUrl: imageUrl,
          password:password
        });

        console.log('User Registered');
        console.log(userCredential);
        console.log(user);
      } else {
        console.error('Please select an image.');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleTogglePasswordVisibility = () => {
    setState({
      ...state,
      showPassword: !state.showPassword,
    });
  };

  return (
    <div className="d-flex justify-content-center flex-column input-field">
    <Card variant="outlined"
    sx={{
      maxWidth:'500px',
      marginLeft:'auto',
      marginRight:'auto',
      marginTop:'20px',
     borderRadius:'10px',
     background:'#f3f4f7'
    }}>
      <CardContent>
        <Typography variant="h6" align="center" sx={{ fontWeight: 'bold', color: 'text.primary' }}>
          New to Here
        </Typography>
        <Avatar sx={{ width: 96, height: 96, margin: '0 auto' }}>
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
          placeholder="At least 6 chracters"
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
        <input
          type="file"
          id="imageFile"
          name="imageFile"
          onChange={handleImage}
          style={{ display: 'none' }}
        />
        <label htmlFor="imageFile">
          <Button variant="outlined" component="span">
            Add Image
          </Button>
        </label>
        {state.imageFile && (
          <Typography variant="body1">
            Image selected: {state.imageFile.name}
          </Typography>
        )}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Link to="/SignIn" >
          <Button
            variant="outlined"
            color="warning"
            size="large"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          </Link>
        </div>
        <Typography variant="body1" align="center">
          Already Have An Account?{' '}
          <Link to="/SignIn" className="fw-bold text-decoration-none">
            Sign In
          </Link>
        </Typography>
      </CardContent>
    </Card>
  </div>
  );
};

export default Register;
