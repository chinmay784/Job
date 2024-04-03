import React, { createContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Jobs = () => {
  
  const [job ,setJobs] = useState([]);

  useEffect(() =>{
    try {
      axios.get(
        "http://localhost:4000/api/v1/job/getall",
        { withCredentials : true},
      ).then((res) =>{
        setJobs(res.data)
        // console.log(res.data)
      })
    } catch (error) {
     console.log(error)
    }
  },[])




  return (
    <section className='jobs page'>
      <div className='container'>
        <h1>All Avalibale Jobs</h1>
        <div className='banner'>
           {
            job.jobs && job.jobs.map((element) =>{
              return (
                <div className='card' key={element.id}>
                  <p>{element.title}</p>
                  <p>{element.category}</p>
                  <p>{element.country}</p>
                  <Link to={`/job/${element._id}`}>Job Details</Link>
                </div>
              )
            })
           }
        </div>
      </div>
    </section>
  )
}

export default Jobs