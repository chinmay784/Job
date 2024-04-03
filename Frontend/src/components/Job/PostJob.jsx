import React, {  createContext, useState } from 'react'
import { Context } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const PostJob = () => {

  const [title, setTitle] = useState("");
  const [description, setDescripition] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryForm, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salarytype, setSalarytype] = useState("default");

  const {isAuthorized} = createContext(Context)


  const navigate = useNavigate()


  const handelJobPost = async (e) => {
    e.preventDefault();


    if (salarytype === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryTo("")
    }
    else if (salarytype === "Ranged Salary") {
      setFixedSalary("")
    }
    else {
      setSalaryFrom("");
      setSalaryTo("")
      setFixedSalary("")
    }


    await axios.post(
      "http://localhost:4000/api/v1/job/post",
      fixedSalary.length >= 4 ? { title, category, country, city, location, fixedSalary, description } : { title, category, country, city, location, salaryForm, salaryTo, description },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json"
        }
      },
    ).then(res => {
      toast.success(res.data.message)
      navigate("/job/getall")
      console.log(res.data.message)
    }).catch(error => {
      toast.error(error.response.data.message)
      console.log(error)
    })
  }

  // const navigateTo = useNavigate();
  // if (!isAuthorized || (user && user.role !== "Employer")) {
  //   navigateTo("/");
  // }

  return (
    <>
      <div className='job_post page'>
        <div className='container'>
          <h3>POST A NEW JOB</h3>

          <form onSubmit={handelJobPost}>
            <div className='wrapper'>
              <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Job Titel' />

              <select value={category} onChange={(e) => setCategory(e.target.value)}>
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

            <div className='wrapper'>
              <input type='text' value={country} onChange={(e) => setCountry(e.target.value)} placeholder='Country' />

              <input type='text' value={city} onChange={(e) => setCity(e.target.value)} placeholder='city' />
            </div>
            <input type='text' value={location} onChange={(e) => setLocation(e.target.value)} placeholder='Location' />

            <div className='salary_wrapper'>
              <select value={salarytype} onChange={(e) => setSalarytype(e.target.value)}>
                <option value={"default"}></option>
                <option value={"Fixed Salary"}>Fixed Salary</option>
                <option value={"Ranged Salary"}>Ranged Salary</option>
              </select>
              <div>
                {
                  salarytype === "default" ? (<p>Please provide salary Type *</p>) : salarytype === "Fixed Salary" ? (
                    <input type='number' value={fixedSalary} placeholder='enter fixed salary' onChange={(e) => setFixedSalary(e.target.value)} />
                  ) : (
                    <div className='ranged_salary'>
                      <input type='number' value={salaryForm} placeholder=' salary from' onChange={(e) => setSalaryFrom(e.target.value)} />

                      <input type='number' value={salaryTo} placeholder=' salary to' onChange={(e) => setSalaryTo(e.target.value)} />
                    </div>
                  )
                }
              </div>
            </div>

            <textarea rows={"10"} value={description} onChange={(e) => setDescripition(e.target.value)} placeholder='descripition' />

            <button type='submit'> Create Job</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default PostJob