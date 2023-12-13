import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../Navbar/Navbar';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Campaigns.css';
import { UserContext } from '../../App'
const Campaign = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const location = useLocation();
  const userData = location.state && location.state.user;
  const { state: userState } = useContext(UserContext);
  

  const [donationProgress, setDonationProgress] = useState(50); // Set initial donation progress

  const handleDonate = (event) => {
    const eventData = {
      _id: event._id,
      name: event.name,
      // Add other properties you need
    };
  
    // Pass the extracted data to the Donation page
    navigate("/Donation", { state: { user: userState, event: eventData } });
  };
  

  useEffect(() => {
    fetch('/allevent', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("Received data:", result);
        if (result && result.posts) {
          setData(result.posts);
          console.log('User Data:', userState)
        } else {
          console.error("Invalid data format:", result);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userState]);
  
  return (
    <div className="home">
      <Navbar />

      <div className="campaigns-container">
        {data.map((campaign) => (
          <div key={campaign._id} className="campaign-card">
            <img src={campaign.photo} alt={campaign.name} />
            <h2>{campaign.name}</h2>
            <p>{campaign.shortdesc}</p>
            
            <button onClick={() => handleDonate(campaign)}>Donate</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Campaign;
