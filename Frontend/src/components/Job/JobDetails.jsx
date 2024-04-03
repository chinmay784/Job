import React, { createContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Context } from '../../main';
import axios from 'axios';

const JobDetails = () => {
  const {id} = useParams();
  const [job,setJob] = useState({});
  const navigate = useNavigate();
  const {user, setuser} = createContext(Context)


  useEffect( () =>{
    
    axios.get(
      `http://localhost:4000/api/v1/job/${id}`,
      {withCredentials:true}
    )
    .then((res) =>{
      setJob(res.data.job)
    })
    .catch((error) =>{
      console.log(error.response.data.message)
      navigate("/notfound")
    })
  },[])
  return (
    <div className='jobDetail page'>
      <div className='container'>
        <h3>Job Details</h3>
        <div className='banner'>
          <p>
            Title : <span>{job.title}</span>
          </p>
          <p>
            Category : <span>{job.category}</span>
          </p>
          <p>
            country : <span>{job.country}</span>
          </p>
          <p>
            city : <span>{job.city}</span>
          </p>
          <p>
            Descripition : <span>{job.description}</span>
          </p>
          <p>
            Job-Posted on : <span>{job.jobPostedOn}</span>
          </p>
          <p>
            salary :{job.fixedSalary ? (
              <span>{job.fixedSalary}</span>
            ) : (<span>{job.salaryForm} - {job.salaryTo}</span>)}
          </p>

          
            {
              user && user.role === "Job Seeker" ? (<></> ): (<Link to={`/application/${job._id}`}>Apply now</Link>)
            }

          
        </div>
        
      </div>
    </div>
  )
}

export default JobDetails