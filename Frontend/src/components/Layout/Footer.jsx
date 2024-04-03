import React, { useContext } from 'react'
import {Context} from "../../main"
import {FaGithub,FaInstagram,FaLinkedin} from "react-icons/fa"
import { Link } from 'react-router-dom';

const Footer = () => {

  const {isAuthorized, setisAuthorized, user} = useContext(Context);


  return (
    <footer className={ isAuthorized ? "footerShow" : "footerHide"}>
      <div> @ All Rights Reserved By Chinmay.</div>

      <div>
        <Link to={"https://github.com/chinmay784"} target='_blank'>
          <FaGithub />
        </Link>
        <Link to={"https://www.instagram.com/_its_chinmay_84/"} target='_blank'>
          <FaInstagram />
        </Link>
        <Link to={"https://www.linkedin.com/in/chinmay-puhan-98ab41258/"} target='_blank'>
          <FaLinkedin />
        </Link> 
      </div>
    </footer>
  )
}

export default Footer