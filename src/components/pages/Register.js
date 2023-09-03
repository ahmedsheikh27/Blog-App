import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../config/Firebasa';
import { Link } from 'react-router-dom';
import './page.css'

const initiallizestate = { name: "", email: "", password: "" }

const Register = () => {

  const [state, setState] = useState(initiallizestate)

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, name } = state;
  
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        
        // Update the user's display name
        updateProfile(user, { displayName: name })
          .then(() => {
            console.log('User display name updated:', name);
            // Redirect or do something else if needed
          })
          .catch((error) => {
            console.error('Error updating user display name:', error);
          });
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
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
            <label
              for="exampleInputEmail1"
              className="form-label">
              Your Name
            </label>
            <input
              type="text"
              name='name'
              placeholder='First and Last name'
              onChange={handleChange}
              className="form-control p-3"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
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
            Don't Have An Account?
            <Link to='/SignIn'
              className=' fw-bold text-decoration-none'>
              Sign In</Link>
          </p>
        </form>


      </div>
    </div >
  )
}

export default Register
