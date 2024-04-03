import React, { useContext } from 'react'
import { Context } from '../../main'
import { Navigate } from 'react-router-dom';
import Herosection from './Herosection';
import HowitWorks from './HowitWorks';
import PopularCategory from './PopularCategory';
import PopularCompany from './PopularCompany';

const Home = () => {

  const { isAuthorized } = useContext(Context);

  if (!isAuthorized) {
    return <Navigate to={"/login"} />
  }


  return (
    <section className='homePage page'>
      <Herosection />
      <HowitWorks />
      <PopularCategory />
      <PopularCompany />
    </section>
  )
}

export default Home