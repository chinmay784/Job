import React, { useContext, useEffect, useState } from 'react'
import { Context } from "../../main"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Resumemodel from './Resumemodel';

const Myapplication = () => {

  const [application, setApplication] = useState([]);
  const [modelOpen, setModelOpen] = useState(false)
  const [resumeUrl, setresumeUrl] = useState("");
  const { user, isAuthorized } = useContext(Context);

  const navigate = useNavigate();


  useEffect(() => {
    try {
      if (user && user.role === "Employer") {
        axios.get(
          "http://localhost:4000/api/v1/application/employer/getall",
          { withCredentials: true },
        ).then((res) => {
          setApplication(res.data.application)
        })
      } else {
        axios.get(
          "http://localhost:4000/api/v1/application/jobseeker/getall",
          { withCredentials: true },
        ).then((res) => {
          setApplication(res.data.application)
        })
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }, [isAuthorized])



  if (!isAuthorized) {
    navigate("/login")
  }



  const deleteApplication = (id) => {
    try {

      axios.delete(
        `http://localhost:4000/api/v1/application/delete/${id}`,
        { withCredentials: true }
      ).then((res) => {
        toast.success(res.data.message)
        setApplication((pre) => pre.filter((appli) => appli._id !== id))
      })
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }


  const openModel = (imageUrl) => {
    setresumeUrl(imageUrl)
    setModelOpen(true)
  }

  const closeModel = () => {
    setModelOpen(false)
  }

  return (
    <>
      <section className='my_applications page'>
        {
          user && user.role === "Job Seeker" ? (
            <div className='container'>
              <h3>My Applications</h3>
              {
                application.map(element => {
                  return <JobSeekerCard element={element} key={element._id} deleteApplication={deleteApplication} openModel={openModel} />
                })
              }
            </div>
          ) : (
            <div className='container'>
              <h3> Applications from job Seekers</h3>

              {
                application.length <= 0 ? (
                  <>
                    <h4>No Applications Found</h4>
                  </>
                ) : (
                  application.map(element => {
                    return <EmployerCard element={element} key={element._id} openModel={openModel} />
                  })
                )
              }


            </div>
          )
        }


        {
          modelOpen && (
            <Resumemodel imageUrl={resumeUrl} onClose={closeModel} />
          )
        }
      </section>
    </>
  )
}

export default Myapplication;


const JobSeekerCard = ({ element, deleteApplication, openModel }) => {
  return <>
    <div className='job_seeker_card'>
      <div className='detail'>
        <p>
          <span>Name :</span>
          {element.name}
        </p>
        <p>
          <span>Email :</span>
          {element.email}
        </p>
        <p>
          <span>phone :</span>
          {element.phone}
        </p>
        <p>
          <span>address :</span>
          {element.address}
        </p>
        <p>
          <span>coverLetter :</span>
          {element.coverLetter}
        </p>
      </div>
      <div className='resume'>
        <img src={element.resume.url} alt='logo' onClick={() => openModel(element.resume.url)} />
      </div>

      <div className='btn_area'>
        <button onClick={() => deleteApplication(element._id)}>Delete Application</button>
      </div>
    </div>
  </>
}


const EmployerCard = ({ element, deleteApplication, openModel }) => {
  return <>
    <div className='job_seeker_card'>
      <div className='detail'>
        <p>
          <span>Name :</span>
          {element.name}
        </p>
        <p>
          <span>Email :</span>
          {element.email}
        </p>
        <p>
          <span>phone :</span>
          {element.phone}
        </p>
        <p>
          <span>address :</span>
          {element.address}
        </p>
        <p>
          <span>coverLetter :</span>
          {element.coverLetter}
        </p>
      </div>
      <div className='resume'>
        <img src={element.resume.url} alt='logo' onClick={() => openModel(element.resume.url)} />
      </div>


    </div>
  </>
}








// {
//   application.map(element =>{
//     return <EmployerCard element={element} key={element._id} openModel={openModel} />
//   })
// }