import React, { createContext, useEffect, useState } from 'react'
import { FaCheck } from "react-icons/fa6"
import { RxCross2 } from "react-icons/rx"
import { useNavigate } from "react-router-dom"
import { Context } from '../../main'
import axios from 'axios'
import toast from 'react-hot-toast'

const Myjobs = () => {

  const navigate = useNavigate();

  const [myJobs, setMyJob] = useState([])
  const [editMode, setEditMode] = useState(null);

  const { isAuthorized, user } = createContext(Context);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/job/getmyjobs",
          { withCredentials: true, }
        );

        setMyJob(data.myjobs)

      } catch (error) {
        toast.error(error.response.data.message)
        setMyJob([])
      }
    }

    fetchJobs();
  }, [])


  // if (!isAuthorized || (user && user.role !== "Employer")) {
  //   navigate("/")
  // }


  const handelEnableEdit = (jobId) => {
    setEditMode(jobId);
  }

  const handelDisableEdit = (jobId) => {
    setEditMode(jobId);
  }


  const handelUpdateJob = async (jobId) => {
    const updateJob = myJobs.find(job => job._id === jobId);

    await axios.put(
      `http://localhost:4000/api/v1/job/update/${jobId}`,
      updateJob,
      { withCredentials: true }
    ).then(res => {
      toast.success(res.data.message);
      setEditMode(null)
    }).catch((error) => {
      toast.error(error.response.data.message)
    })
  }



  const handelJobDeleteJob = async (jobId) => {
    await axios.delete(
      `http://localhost:4000/api/v1/job/delete${jobId}`,
      { withCredentials: true }
    ).then(res => {
      toast.success(res.data.message);
      setMyJob(pre => pre.filter(job => job._id !== jobId))
    }).catch((error) => {
      toast.error(error.response.data.message)
    })
  }


  const handelInputChange =  (jobId, filed, value) => {
    setMyJob((pre) => 
      pre.map((job) => 
        job._id === jobId ? { ...job, [filed]: value } : job
      )
    )
  }


  return (
    <>
      <div className='myJobs page'>
        <div className='container'>
          <h3>Your Posted Jobs</h3>

          {
            myJobs && myJobs.length > 0 ? <>
              <div className='banner'>
                {
                   myJobs.map(element => {
                    return (
                      <div className='card' key={element._id}>
                        <div className='content'>
                          <div className='short_fields'>
                            <div>
                              <span>Title :</span>
                              <input type='text'
                                disabled={editMode !== element._id ? true : false}
                                value={element.title}
                                onChange={(e) => handelInputChange(element._id, "title", e.target.value)} />
                            </div>

                            <div>
                              <span>Country :</span>
                              <input type='text'
                                disabled={editMode !== element._id ? true : false}
                                value={element.country}
                                onChange={(e) => handelInputChange(element._id, "country", e.target.value)} />
                            </div>

                            <div>
                              <span>City :</span>
                              <input type='text'
                                disabled={editMode !== element._id ? true : false}
                                value={element.city}
                                onChange={(e) => handelInputChange(element._id, "city", e.target.value)} />
                            </div>

                            <div>
                              <span>Category :</span>
                              <select value={element.category} onChange={(e) => handelInputChange(element._id, "category", e.target.value)} disabled={editMode !== element._id ? true : false} >
                                <option value="">Select Category</option>
                                <option value="Graphics & Design">Graphics & Design</option>
                                <option value="Mobile App Development">
                                  Mobile App Development
                                </option>
                                <option value="Frontend Web Development">
                                  Frontend Web Development
                                </option>
                                <option value="MERN Stack Development">
                                  MERN STACK Development
                                </option>
                                <option value="Account & Finance">Account & Finance</option>
                                <option value="Artificial Intelligence">
                                  Artificial Intelligence
                                </option>
                                <option value="Video Animation">Video Animation</option>
                                <option value="MEAN Stack Development">
                                  MEAN STACK Development
                                </option>
                                <option value="MEVN Stack Development">
                                  MEVN STACK Development
                                </option>
                                <option value="Data Entry Operator">Data Entry Operator</option>
                              </select>
                            </div>

                            <div>
                              <span>Salary : {" "}
                                {
                                  element.fixedSalary
                                    ? <input type='number' value={element.fixedSalary} onChange={(e) => handelInputChange(element._id, "fixedSalary", e.target.value)} disabled={editMode !== element._id ? true : false} /> : <div>

                                      <input type='number' value={element.salaryForm} onChange={(e) => handelInputChange(element._id, "salaryForm", e.target.value)} disabled={editMode !== element._id ? true : false} />

                                      <input type='number' value={element.salaryTo} onChange={(e) => handelInputChange(element._id, "salaryTo", e.target.value)} disabled={editMode !== element._id ? true : false} />

                                    </div>
                                }
                              </span>

                            </div>


                            <div>
                              <span>
                                Expier :
                              </span>
                              <select value={element.expired} onChange={(e) => handelInputChange(element._id, "expired", e.target.value)} disabled={editMode !== element._id ? true : false}>
                                <option value={true}>TRUE</option>
                                <option value={false}>False</option>
                              </select>
                            </div>

                          </div>

                          <div className='long_field'>
                            <div>
                              <span>Descripition :</span>
                              <textarea rows={5} value={element.description} onChange={(e) => handelInputChange(element._id, "description", e.target.value)} disabled={editMode !== element._id ? true : false} />
                            </div>

                            <div>
                              <span>Location :</span>
                              <textarea rows={5} value={element.location} onChange={(e) => handelInputChange(element._id, "location", e.target.value)} disabled={editMode !== element._id ? true : false} />
                            </div>
                          </div>
                        </div>


                        <div className='button_wrapper'>
                          <div className='edit_btn_wrapper'>
                            {
                              editMode === element._id ? (<>
                                <button className='check_btn' onClick={() => handelUpdateJob(element._id)}>
                                  <FaCheck />
                                </button>

                                <button className='cross_btn' onClick={() => handelDisableEdit()}>
                                  <RxCross2 />
                                </button>
                              </>) : (<>
                                <button className='edit_btn' onClick={() => handelEnableEdit(element._id)}>
                                  Edit
                                </button>
                              </>)
                            }
                          </div>

                          <button onClick={() => handelJobDeleteJob(element._id)} className='delete_btn'>
                            Delete
                          </button>
                        </div>
                      </div>
                    )
                  })
                }
              </div>
            </> : <pve>You've not posted any job</pve>
          }
        </div>
      </div>
    </>
  )
}

export default Myjobs