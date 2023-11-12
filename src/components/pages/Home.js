import React from 'react'
import './page.css'
import blog from '../assets/blog.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons'
import { auth } from '../config/Firebasa'
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom'
import Post from '../posts/Post'


const Home = () => {
  const navigate = useNavigate()
  const getStarted = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('AddPost')
      }
      else {
        navigate('SignIn')
      }
    })
  }

  return (
    <>
      <div>

        <div class="card">
          <img src={blog} alt="..." className='imag' />
          <div class="card-content">
            <h2>The Sustainable Investor</h2>
            <h4>Making sustainability financially sound</h4>
            <h5>Start your journey with us .</h5>
            <button className='start'
            onClick={getStarted}>
              Get Started
              <FontAwesomeIcon icon={faGreaterThan} />
            </button>
          </div>
        </div>
        <div className='homecard'>  
        <Post/>
        </div>
      </div>

    </>
  )
}

export default Home
