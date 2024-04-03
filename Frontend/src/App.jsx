import React, { useContext, useEffect } from 'react'

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import Home from './components/Home/Home'
import Jobs from './components/Job/Jobs'
import JobDetails from './components/Job/JobDetails'
import Application from './components/Applications/Application'
import Myapplication from './components/Applications/Myapplication'
import PostJob from './components/Job/PostJob'
import Myjobs from './components/Job/Myjobs'
import NotFound from './components/Notfound/NotFound'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import { Toaster } from "react-hot-toast"
import { Context } from './main'
import axios from "axios"

const App = () => {

  const { isAuthorized, setisAuthorized, setuser } = useContext(Context);

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/user/getuser", { withCredentials: true });
        setuser(response.data.user);
        setisAuthorized(true);
      } catch (error) {
        setisAuthorized(false);
      }
    };

    fetchUser();
  }, [isAuthorized]);



  return (
    <>
      <BrowserRouter>

        <Navbar />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Home />} />
          <Route path='/job/getall' element={<Jobs />} />
          <Route path='/job/:id' element={<JobDetails />} />
          <Route path='/job/post' element={<PostJob />} />
          <Route path='/job/me' element={<Myjobs />} />
          <Route path='/application/:id' element={<Application />} />
          <Route path='/application/me' element={<Myapplication />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>

    </>
  )
}

export default App;