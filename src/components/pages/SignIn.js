import React, { useState } from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/Firebasa';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons';
// import Register from './Register';
// import {firebase} from 'firebase/app';

const initiallizestate = { email: "", password: "" }

const SignIn = () => {
  // const provider = new GoogleAuthProvider();

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
  // const handelDelete = () => {
  //   const user = auth.currentUser
  //   deleteUser(user).then((currentUser) => {
  //     // User deleted.
  //   }).catch((error) => {
  //     // An error ocurred
  //     // ...
  //   });
  // }






  return (

    <div>
      <div className='d-flex justify-content-center flex-column'>
        <h1 className='mt-3 mb-3 text-center text-danger'>Login</h1>
        <form className='input-feild'>
          <div className='fw-bold text-warning font-poppins text-center'>

            <h5 >Welcome Back</h5>
            <FontAwesomeIcon className='fs-1' icon={faFaceSmile} />
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
              className="btn btn-outline-warning d-flex justify-content-center text-dark fw-bold  "
              onClick={handleSubmit}>
              Submit
            </button>
          </div>

          <p className='mt-3 text-center'>
            Don't Have An Account?
            <Link to='/Register'
              className=' fw-bold text-decoration-none'>
              Register</Link>


          </p>
        </form>
        {/* <button 
        onClick={handelDelete}
        type="submit"
              className="btn btn-outline-warning d-flex justify-content-center text-dark fw-bold "
        >
          Delete User
        </button> */}

        {/* <button onClick={deleteUser}>Delete User</button> */}
        <div className='mb-3'>
          Current User : {user.email}
        </div>
      </div>
    </div >
  )
}

export default SignIn
