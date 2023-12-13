import React,{useState,useEffect} from 'react'
import Navbar from '../Navbar/Navbar';
import './Event.css'

const Event = () => {

  
  return (
<div > 
         <Navbar/>
<div className="events-container">
      <div className="event-card">
        <img src="https://charite.solverwp.com/wp-content/uploads/2023/08/cause-two3-274x249.jpg" alt="Event 1" />
        <h2>The Right of Childen</h2>
        <p>Description of Event 1</p>
        <button>Volunteer</button>
      </div>

      <div className="event-card">
        <img src="https://charite.solverwp.com/wp-content/uploads/2023/08/cause-two4-274x249.jpg" alt="Event 2" />
        <h2>Event 2</h2>
        <p>Integer pulvinar elementum iaculis. Phasellus non turpis in nisi semper</p>
        <button>Volunteer</button>
      </div>

      <div className="event-card">
        <img src="https://charite.solverwp.com/wp-content/uploads/2023/08/cause-two5-274x249.jpg" alt="Event 3" />
        <h2>Event 3</h2>
        <p>Description of Event 3</p>
        <button>Volunteer</button>
      </div>

      <div className="event-card">
        <img src="https://charite.solverwp.com/wp-content/uploads/2023/07/cause-two9-274x249.jpg" alt="Event 4" />
        <h2>Event 4</h2>
        <p>Description of Event 4</p>
        <button>Volunteer</button>
      </div>

      <div className="event-card">
        <img src="https://charite.solverwp.com/wp-content/uploads/2023/07/cause-two9-274x249.jpg" alt="Event 4" />
        <h2>Event 4</h2>
        <p>Description of Event 4</p>
        <button>Volunteer</button>
      </div>
    </div>
    </div>
  )
}
export default Event;