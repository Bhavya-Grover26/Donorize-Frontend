import React, { useState, useEffect, useContext } from 'react';
import NavbarOrg from '../NavbarOrg/NavbarOrg'
import './Progress.css';
import { OrgContext } from '../../App';

const Progress = () => {
  const { state } = useContext(OrgContext);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch event progress when the component mounts
    fetch('/myevent', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setEvents(data.myevents || []);
      })
      .catch((error) => {
        console.error('Error fetching event progress:', error);
      });
  }, []);

  return (
    <div>
      <NavbarOrg />
      <div className="container2">
        {/* Event progress table */}
        <table className="donation-history">
          {/* Header row */}
          <tr className="donation-row header">
            <th className="donation-cell">Event Name</th>
            <th className="donation-cell">Objective</th>
            <th className="donation-cell">Amount Collected</th>
            <th className="donation-cell">Progress</th>
          </tr>

          {/* Event rows */}
          {events.map((event) => (
            <tr key={event._id} className="donation-row">
              <td className="donation-cell campaign-title">{event.name}</td>
              <td className="donation-cell">₹{event.objective}</td>
              <td className="donation-cell">₹{event.moneyAmount}</td>
              <td className="donation-cell">
              <div className="progress-bar-container">
                  <div className="progress-bar" style={{ width: `${(event.moneyAmount / event.objective) * 100}%`, backgroundColor: getColor(event.moneyAmount, event.objective) }}></div>
                  <div className="progress-text">{((event.moneyAmount / event.objective) * 100).toFixed(2)}%</div>
                </div>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

// Function to determine color based on percentage
const getColor = (amount, objective) => {
  const percentage = (amount / objective) * 100;
  if (percentage < 50) {
    return '#D80032'; // Change color as needed
  } else if (percentage < 80) {
    return 'orange'; // Change color as needed
  } else {
    return 'green'; // Change color as needed
  }
};

export default Progress;
