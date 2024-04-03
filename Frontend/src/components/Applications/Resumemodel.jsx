import React from 'react'

const Resumemodel = ({ imageUrl, onClose }) => {
  return (
    <>
      <div className='resume-model'>
        <div className='model-content'>
          <span className='close' onClick={onClose}>
            &times;
          </span>
          <img src={imageUrl} alt='resume' />
        </div>
      </div>
    </>
  )
}

export default Resumemodel