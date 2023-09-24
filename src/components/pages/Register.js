import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../config/Firebasa';
import { Link } from 'react-router-dom';
import {  getFirestore,collection, addDoc } from 'firebase/firestore'; // Import Firestore functions
import './page.css'

const initialState = { name: "", email: "", password: "" };


const Register = () => {

  const [state, setState] = useState(initialState)

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, name } = state;
  
    try {
      // Create the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Set the user's display name to be the email
      await updateProfile(user, { displayName: email });
  
      // Store the user's data in Firestore
      const db = getFirestore();
      const usersRef = collection(db, 'users');
  
      await addDoc(usersRef, {
        name: name,
        email: email,
        password: password,
        // You can add more user-related data here if needed
      });
  
      console.log("User Registered");
      console.log(userCredential);
      console.log(user);
    } catch (error) {
      console.error(error);
    }
  };
  






  return (
    <div>
      <div className='d-flex justify-content-center flex-column'>
        <h1 className='mt-3 text-center text-danger mb-3'>Register</h1>
        <form className='input-feild'>
          <div className='fw-bold text-warning font-poppins text-center'>
            <h5 >New to Here</h5>
          </div>

          <div className="mb-3">
            <label for="exampleInputName" className="form-label">
              Your Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="First and Last name"
              onChange={handleChange}
              className="form-control p-3"
              id="exampleInputName" // Update the input ID
              aria-describedby="emailHelp"
            />

          
      </div>
      <div className="mb-3">
        <label
          for="exampleInputEmail1"
          className="form-label">
          Email address
        </label>
        <input
          type="email"
          name='email'
          placeholder='Your email address'
          onChange={handleChange}
          className="form-control p-3"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label
          for="exampleInputPassword1"
          className="form-label"
        >Password</label>
        <input
          type="password"
          className="form-control p-3"
          placeholder='Your password'
          id="exampleInputPassword1"
          name='password'
          onChange={handleChange}
        />
      </div>
      <div className="mb-3 form-check">
        <input type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
          onChange={handleChange} />
        <label
          className="form-check-label"
          for="exampleCheck1"
        > Check me out</label>
      </div>
      <div className='d-flex justify-content-center '>

        <button
          type="submit"
          className="btn btn-outline-warning d-flex justify-content-center text-dark fw-bold "
          onClick={handleSubmit}>
          Submit
        </button>
      </div>

      <p className='mt-3 text-center'>
        Already Have An Account?
        <Link to='/SignIn'
          className=' fw-bold text-decoration-none'>
          Sign In</Link>
      </p>
    </form>


      </div >
    </div >
  )
}

export default Register
