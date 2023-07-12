import React from 'react'
import './page.css'
import blog from '../assets/blog.png'
import HomeCard from '../card/HomeCard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGreaterThan } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'


const Home = () => {

  return (
    <>
    <div>

      <div class="card">
        <img src={blog} alt="..." className='imag' />
        <div class="card-content">
          <h2>The Sustainable Investor</h2>
          <h4>Making sustainability financially sound</h4>
          <h5>Start your journey with us .</h5>
          <Link to='/SignIn'>
        <button className='start'>
          Get Started 
          <FontAwesomeIcon icon={faGreaterThan} />
        </button>
          </Link>
        </div>
      </div>
<div className='homecard'>
  <HomeCard />
</div>
    </div>

    </>
  )
}

export default Home
