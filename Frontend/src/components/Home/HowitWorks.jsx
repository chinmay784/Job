import React from 'react'
import { FaUserPlus } from 'react-icons/fa'
import { MdFindInPage } from 'react-icons/md'
import { IoMdSend } from 'react-icons/io'

const HowitWorks = () => {
  return (
    <div className='howitworks'>
      <div className='container'>
        <h3>How JobZee Works</h3>
        <div className='banner'>
          <div className='card'>
            <FaUserPlus />
            <p>Create Account</p>
            <p>lorem20lorem20lorem20lorem20lorem20lorem20
            lorem20lorem20lorem20lorem20lorem20lorem20</p>
          </div>

          <div className='card'>
            <MdFindInPage />
            <p>Find a Job/Post</p>
            <p>lorem20lorem20lorem20lorem20lorem20lorem20
            lorem20lorem20lorem20lorem20lorem20lorem20</p>
          </div>

          <div className='card'>
            <IoMdSend />
            <p>Create Account</p>
            <p>lorem20lorem20lorem20lorem20lorem20lorem20
            lorem20lorem20lorem20lorem20lorem20lorem20</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HowitWorks