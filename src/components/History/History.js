import React, { useState,useEffect,useContext } from 'react';
import Navbar from '../Navbar/Navbar';
import './History.css'
import { UserContext } from '../../App';

const History = () => {
  const { state } = useContext(UserContext);
  const [donations, setDonations] = useState([]);
  const [totalDonations, setTotalDonations] = useState(0);
  

  useEffect(() => {
    // Fetch donation history when the component mounts
    fetch('/mydonations', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDonations(data.donations || []);
        const totalAmount = data.donations.reduce((sum, donation) => sum + donation.amount, 0);

        const totalNumberOfDonations = data.donations.length;
        setTotalDonations(totalNumberOfDonations);
      })
      .catch((error) => {
        console.error('Error fetching donation history:', error);
      });
  });
    
  return (
<div > 
         <Navbar/>
         <div className="container">
        <div className="profile">
          <div className="profile-user-settings">
            <h1 className="profile-user-name">Username:{state.username}</h1>
            <button className="btn profile-edit-btn">Edit Profile </button>
            <button
              className="btn profile-settings-btn"
              aria-label="profile settings"
            >
              <i className="fas fa-cog" aria-hidden="true"></i>
            </button>
          </div>
          <div className="profile-stats">
            <ul>
              <li>
                <span className="profile-stat-count">{totalDonations}</span> Donations
              </li>
            </ul>
          </div>
        </div>
    </div>
    <div className="container2">
        {/* Donation history table */}
        <div className="donation-history">
          {/* Header row */}
          <div className="donation-row header">
            <div className="donation-cell">Campaign</div>
          
            <div className="donation-cell">Category</div>
            <div className="donation-cell">Amount/Item</div>
            <div className="donation-cell">Date</div>
          </div>

          {/* Donation rows */}
          {/* Donation rows */}
          {donations.map((donation) => (
            <div key={donation._id} className="donation-row">
              <div className="donation-cell">
                {/* Image and title in the first column */}
                <div className="campaign-title">{donation.eventName}</div>
              </div>
              
              <div className="donation-cell">{donation.category}</div>
              <div className="donation-cell">{donation.amount}</div>
              <div className="donation-cell">{new Date(donation.date).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;