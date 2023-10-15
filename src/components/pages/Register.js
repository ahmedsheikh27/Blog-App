import React, { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../config/Firebasa';
import { Link } from 'react-router-dom';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../config/Firebasa';
import './page.css';

const initialState = { name: '', email: '', password: '', imageFile: null };

const Register = () => {
  const [state, setState] = useState(initialState);

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

  return (
    <div className='input-feild'>
      <div className="d-flex justify-content-center flex-column">
        <h1 className="mt-3 text-center text-danger mb-3">Register</h1>
        <form className="input-field">
          <div className='fw-bold text-warning font-poppins text-center'>
            <h5>New to Here</h5>
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
              aria-describedby="emailHelp"
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="email"
              className="form-label">
              Email address
            </label>
            <input
              type="email"
              name='email'
              placeholder='Your email address'
              onChange={handleChange}
              className="form-control p-3"
              id="email"
            />
          </div>

          <div className="mb-3">
            <label
              htmlFor="password"
              className="form-label"
            >Password</label>
            <input
              type="password"
              className="form-control p-3"
              placeholder='Your password'
              id="password"
              name='password'
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="imageFile" className="form-label">
              Add Image
            </label>
            <input
              type="file"
              className="form-control p-3"
              placeholder="Upload Profile Photo"
              id="imageFile"
              name="imageFile"
              onChange={handleImage}
            />
          </div>

          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-outline-warning d-flex justify-content-center text-dark fw-bold"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>

          <p className="mt-3 text-center text-sm">
            Already Have An Account?
            <Link to="/SignIn" className="fw-bold text-decoration-none">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
