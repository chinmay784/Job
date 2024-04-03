import React, { useContext, useState } from 'react'
import { Context } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link, Navigate } from 'react-router-dom';
import { FaPencilAlt, FaRegUser } from 'react-icons/fa';
import {MdOutlineMailOutline} from "react-icons/md"
import {FaPhoneFlip} from "react-icons/fa6"
import { RiLock2Fill } from "react-icons/ri";


const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPAssword] = useState("");
  const [role, setRole] = useState("");

  const { isAuthorized, setisAuthorized, user, setuser } = useContext(Context);


  const handelLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/user/login",
        {  password, email,  role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      toast.success(data.message);

      setEmail("");
      setPAssword("");
      setRole("");

      setisAuthorized(true);
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
      setisAuthorized(false);
    }
  };


  if (isAuthorized) {
    return <Navigate to={"/"} />
  }

  return (
    <div className=''>
      <section className='authPage'>
        <div className='container'>
          <div className='header'>
            <img src='/JobZeelogo.png' alt='logo' />
            <h3>Login your Account</h3>
          </div>

          <form>
            <div className='inputTag'>
              <label>Login As</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value={""}>Select Role</option>
                  <option value={"Employer"}>Employer</option>
                  <option value={"Job Seeker"}>Job Seeker</option>
                </select>

                <FaRegUser />
              </div>
            </div>

           

            <div className='inputTag'>
              <label>email</label>
              <div>
                <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='enter email' />
                <MdOutlineMailOutline />
              </div>
            </div>

            <div className='inputTag'>
              <label>Password</label>
              <div>
                <input type='password' value={password} onChange={(e) => setPAssword(e.target.value)} placeholder='enter password' />
                <RiLock2Fill />
              </div>
            </div>

           
            
            <button onClick={handelLogin} type='submit' >Login</button>
            <Link to={"/register"}>Register Now</Link>
          </form>
        </div>

        <div className='banner'>
          <img src='/login.png' alt='logo' />
        </div>
      </section>
    </div>
  )
}

export default Login