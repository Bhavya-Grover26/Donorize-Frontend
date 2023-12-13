import React, { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AiOutlineSearch } from 'react-icons/ai';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { BsFillHouseHeartFill } from 'react-icons/bs';
import { BiMap, BiLeftArrow , BiRightArrow} from 'react-icons/bi';
import './Home.css'; // Create a CSS file for styling
import Navbar from '../Navbar/Navbar';
import { UserContext } from '../../App'

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    autoplay: true, // Auto-rotate images
    autoplaySpeed: 2000, // Interval in milliseconds
    slidesToShow: 1,
    slidesToScroll: 1,
  };


  const location = useLocation();
  const { state: userState } = useContext(UserContext);

  useEffect(() => {
    // Access user data from location state
    if (userState) {
      console.log('User Data:', userState);
      // You can now use userState in your component as needed
    }
  }, [userState]);

  return (
    <div>
               <Navbar/>
    <div className="home-page">
      <Slider {...settings}>
        <div>
        <img src="https://sadsindia.org/wp-content/themes/fusion/images/hero/happy_children_SADS_1920x800.jpg" alt="Image 2" />
        </div>
        <div>
        <img src="https://donate.smilefoundationindia.org/images/shikshanaruke/DmEonEblPlNoVAFLZjHxCVIjHrS6Ljf15kUZLC57.jpg" alt="Image 1" />
        </div>
        <div>
          <img src="https://www.savethechildren.org/content/dam/global/images/countries/vietnam/vietnam-girls-m111823-hero.jpg/_jcr_content/renditions/original.img.jpg" alt="Image 3" />
        </div>
      </Slider>
      
      <div className="step-container">
          <div className="step">
            <div className="step-icon">
              <i className="fas fa-search"><AiOutlineSearch/></i> 
            </div>
            <h2>Explore Campaigns</h2>
            <p>Visitors can explore diverse charitable campaigns on the site.</p>
          </div>

          <div className="step">
            <div className="step-icon">
              <i className="fas fa-hand-holding-heart"><IoMdCheckmarkCircleOutline/></i> 
            </div>
            <h2>Select a Campaign</h2>
            <p>Donors select a campaign that aligns with their interests or passions.</p>
          </div>

          <div className="step">
            <div className="step-icon">
              <i className="fas fa-donate"><BsFillHouseHeartFill/></i> 
            </div>
            <h2>Make a Donation</h2>
            <p>Donors have the option to contribute to the chosen campaign.</p>
          </div>

          <div className="step">
            <div className="step-icon">
              <i className="fas fa-share"><BiMap/></i> 
            </div>
            <h2>Track Impact</h2>
            <p>Donors can track their donation's impact and campaign progress.</p>
          </div>
        </div>

  
    </div>
    
    </div>
    
  );
};

export default Home;
