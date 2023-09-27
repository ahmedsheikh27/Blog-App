import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile, sendEmailVerification } from "firebase/auth";
import { auth } from '../config/Firebasa';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons';

const initiallizestate = { name: "", email: "", password: "", imageUrl:"" }

const SignIn = () => {
  const [state, setState] = useState(initiallizestate);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password, name, imageUrl } = state;

    signInWithEmailAndPassword(auth, email, password, name, imageUrl)
      .then((userCredential) => {
        const user = userCredential.user;

        // Set the display name to the name from the form
        updateProfile(user, { displayName: name,imageUrl:user.imageUrl })
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
    signOut(auth).then(() => {
      window.location.reload();
    }).catch((error) => {
      console.log(error);
    });
  };

  const handleEmailVerification = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('Email Verified');
      });
  };

  return (
    <div>
      {user ? (
        <div>
          <img className='img-fluid rounded-5' src={user.imageUrl} alt={`${user.displayName}`} />
          <h2>User Email: {user.email}</h2>
          <h2>User Name: {user.displayName}</h2>
          <h2>UId : {user.uid}</h2>

          <button
            className='btn btn-danger fw-bold btn-sm'
            onClick={handleSignout}>
            Sign Out
          </button>
          <button
            className='btn btn-danger fw-bold btn-sm'
            onClick={handleEmailVerification}>
            Verify Your Email
          </button>
        </div>
      ) : (
        <div className='d-flex justify-content-center flex-column'>
          <h1 className='mt-3 mb-3 text-center text-danger'>Login</h1>
          <form className='input-feild'>
            <div className='fw-bold text-warning font-poppins text-center'>
              <h5>Welcome Back</h5>
              <FontAwesomeIcon className='fs-1' icon={faFaceSmile} />
            </div>

            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
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
              <label for="exampleInputEmail1" className="form-label">
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
              <label for="exampleInputPassword1" className="form-label">
                Password
              </label>
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
              <input
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
                onChange={handleChange}
              />
              <label
                className="form-check-label"
                for="exampleCheck1"
              >
                Check me out
              </label>
            </div>
            <div className='d-flex justify-content-center'>
              <button
                type="submit"
                className="btn btn-outline-warning d-flex justify-content-center text-dark fw-bold"
                onClick={handleSubmit}>
                Submit
              </button>
            </div>
            <p className='mt-3 text-center'>
              Don't Have An Account?
              <Link to='/Register' className='fw-bold text-decoration-none'>
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
