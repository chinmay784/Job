import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='page notfound'>
       <div className=' content'>
        <img  src='/notfound.png' alt='logo1'/>

        <Link to={"/"}>RETURN TO HOME</Link>
       </div>
    </div>
  )
}

export default NotFound