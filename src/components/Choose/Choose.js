import React from 'react';
import { Link } from 'react-router-dom';
import './Choose.css';

const Choose = () => {
  return (
    <div class="wrapper2">
    <div class="table basic">
      <div class="price-section">
        <div class="price-area">
        <div className="inner-area">
              {/* Replace the text with an image */}
              <img src="https://t4.ftcdn.net/jpg/05/26/35/07/360_F_526350772_taMM7EVaoDzWAashADdBrYkjH24hqS3c.jpg" alt="Icon" className="icon-image" />
              <span className="price"></span>
            </div>
        </div>
      </div>
      <div class="package-name"></div>
      <ul class="features">
        <li>
          <span class="list-name">Effortless Fundraising</span>
          <span class="icon check"><i class="fas fa-check"></i></span>
        </li>
        <li>
          <span class="list-name">100% Responsive Design</span>
          <span class="icon check"><i class="fas fa-check"></i></span>
        </li>
        <li>
          <span class="list-name">Get Detailed Insights</span>
          <span class="icon cross"><i class="fas fa-times"></i></span>
        </li>
      </ul>
      <div class="btn">
      <Link to="/Org_login"> 
            <button>Login</button>
          </Link>
        </div>
    </div>

    <div class="table ultimate">
      <div class="price-section">
      <div class="price-area">
        <div className="inner-area">
              {/* Replace the text with an image */}
              <img src="https://i.pinimg.com/1200x/64/81/22/6481225432795d8cdf48f0f85800cf66.jpg" alt="Icon" className="icon-image" />
              <span className="price"></span>
            </div>
        </div>
      </div>
      <div class="package-name"></div>
      <ul class="features">
        <li>
          <span class="list-name">Simple Donations</span>
          <span class="icon check"><i class="fas fa-check"></i></span>
        </li>
        <li>
          <span class="list-name">100% Responsive Design</span>
          <span class="icon check"><i class="fas fa-check"></i></span>
        </li>
        <li>
          <span class="list-name">Discover Campaigns </span>
          <span class="icon check"><i class="fas fa-check"></i></span>
        </li>
       
      </ul>
      <div class="btn">
      <Link to="/User_login"> 
            <button>Login</button>
          </Link>
        </div>
    </div>
  </div>
  );
}

export default Choose;