import React from 'react'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './loader.css'

const Loader = () => {
  return (
     <div className="camera-loader">
    <FontAwesomeIcon icon={faCamera} className="camera-icon" spin />
  </div>
  )
}
export default Loader