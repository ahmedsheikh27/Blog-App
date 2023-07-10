import React, { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Firebasa';
import { NavLink} from 'react-router-dom';
// import Register from './Register';
// import { GoogleAuthProvider } from 'firebase/auth';
// import {firebase} from 'firebase/app';

const initiallizestate = { email: "", password: "" }

const SignIn = () => {

  const [state, setState] = useState(initiallizestate)
  const [user, setUser] = useState({})


  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state)

    const { email, password } = state

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        setUser(user)
      })
      .catch((error) => {
        //   const errorCode = error.code;
        //   const errorMessage = error.message;
        console.log(error)
      });

  }






  return (
    
    <div>
<h1 className='m-3'>Login</h1>
      <form className='input-feild'>
        <div className='d-flex justify-content-center flex-column'>
<h3 className='fw-bold text-warning fs-6 font-poppins text-center'>Welcome Back</h3>

        
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
            className="form-control p-2"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label
            for="exampleInputPassword1"
            className="form-label"
          >Password</label>
          <input
            type="password"
            className="form-control p-2"
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
        </div>
        <div className='d-flex justify-content-center '>

        <button
          type="submit"
          className="btn btn-outline-info d-flex justify-content-center text-danger fw-bold "
          onClick={handleSubmit}>
          Submit
        </button>
            </div>
            
            <p className=''>
              Don't Have An Account?
              <NavLink to='./Register' activeClassName="active">
                Sign Up
              </NavLink>
            </p>
            
      </form>
      {/* <button onClick={deleteUser}>Delete User</button> */}
        <div className='mb-3'>
          Current User : {user.email}
        </div>
    </div>
  )
}

export default SignIn
