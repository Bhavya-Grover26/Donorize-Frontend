import React, { useState , useContext, } from 'react';
import { Link , useNavigate} from 'react-router-dom';
import {OrgContext , UserContext} from '../../App'
import './Navbar.css';
import Event from '../Events/Event';
import Home from '../Home/Home';
import { BsSearch } from 'react-icons/bs';
import { BiUser } from 'react-icons/bi';
import { IoNotificationsOutline } from 'react-icons/io5';

const Navbar=()=>{
  const {state,dispatch} = useContext(UserContext)
  const navigate = useNavigate();
  return(
    <nav>
    <div className="navbar">
      <i className='bx bx-menu'></i>
      <div className="logo"><a href="#">Donorize</a></div>
      <div className="nav-links">
      <div className="sidebar-logo">
        {/* Wrap the logo in a Link */}
        <Link to="/">
          <span className="logo-name">Donorize</span>
        </Link>
        <i className='bx bx-x'></i>
      </div>
      <ul className="links">
        <li>
          <Link to="/user">HOME</Link>
        </li>
        <li>
          <Link to="/campaign">CAMPAIGNS</Link>
        </li>
        <li>
          <Link to="/history">HISTORY</Link>
        </li>
        <li onClick={() => {
          localStorage.clear();
          dispatch({ type: "CLEAR" });
          navigate("/")
        }}>
          Logout
        </li>
        <li>
          <i className='bx bx-search icon-large'><BsSearch /></i>
        </li>
        <li>
          <i className='bx bx-user icon-large'><BiUser /></i>
        </li>
        <li>
          <i className='bx bx-notif icon-large'><IoNotificationsOutline /></i>
        </li>
      </ul>

      </div>
      <div className="contact-box">
        <p>Donate Now</p>
      </div>
      <div className="search-box">
        <i className='bx bx-search'></i>
        <div className="input-box">
          <input type="text" placeholder="Search..." />
        </div>
      </div>
    </div>
  </nav>
  )
}

export default Navbar