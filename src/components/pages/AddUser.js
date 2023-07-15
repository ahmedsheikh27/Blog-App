import React, { useState, useEffect } from 'react'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, sendEmailVerification } from "firebase/auth";
import { auth } from '../config/Firebasa';
// import { Link } from 'react-router-dom';
// import Register from './Register';
// import {firebase} from 'firebase/app';

const initiallizestate = { name: "", email: "", password: "" }

const SignIn = () => {
  // const provider = new GoogleAuthProvider();

  const [state, setState] = useState(initiallizestate)
  const [user, setUser] = useState("")

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user)
        setUser(user)
      } else {
        console.log('User is not signed in')
      }
    });

  }, [])

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(state)

    const { email, password, name } = state

    signInWithEmailAndPassword(auth, email, password, name )
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
  const handleSignout = (e) => {
    signOut(auth).then(() => {
      console.log("User is Signed Out")
      window.location.reload();
      // Sign Out SuccessFull
    }).catch((error) => {
      console.log(error)
    })

  }

  // const usser = auth.currentUser;
  // if(usser !== null){
  //   const displayName = user.displayName;
  //   const email = user.email;
  //   const photoURL = user.photoURL;
  //   const emailVerified = user.emailVerified;
  // }
  const handleEmailVerfication = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('Email Verified')
      })
  }
  const handleUpdateProfile = () => {
    updateProfile(auth.currentUser, {
      displayName: user.name, photoURL: "https://firebasestorage.googleapis.com/v0/b/blog-app-747b7.appspot.com/o/343492293_626551852662849_1932717340159949781_n.jpg?alt=media&token=a7eb8443-aeb4-4846-8805-e425f5c47a31",
    }).then(() => {
      window.location.reload();
      // Profile updated!
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
      console.error(error)
    });
  }



  return (

    <div>
        {user.email


          ? <div>
            <img className='img-fluid rounded-5'
              src={user.photoURL} alt={`${user.email} Profile Photo`} />
            <h2>User Email :{user.email}</h2>
            <h2>User Name:  {user.name}</h2>
            <button
                className='btn btn-danger fw-bold btn-sm'
                onClick={handleSignout}>
                Sign Out
              </button>
              <button
                className='btn btn-danger fw-bold btn-sm'
                onClick={handleEmailVerfication}>
                Verified Your
              </button>
              <button
                className='btn btn-danger fw-bold btn-sm'
                onClick={handleUpdateProfile}>
                Profile
              </button>
          </div>

          : <div className='d-flex justify-content-center flex-column'>
            < h1 className='mt-3 mb-3 text-center text-danger'>Login</h1>
            <form className='input-feild'>
              <div className='fw-bold text-warning font-poppins text-center'>

                <h5 >Welcome Back</h5>
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
{/* 
              <p className='mt-3 text-center'>
                Don't Have An Account?
                <Link to='/Register'
                  className=' fw-bold text-decoration-none'>
                  Register</Link>


              </p> */}
              
            </form>
            {/* <button onClick={deleteUser}>Delete User</button> */}
            
          </div>
        }
    </div >
  )
}

export default SignIn
