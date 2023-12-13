import React, { useState , useEffect, createContext , useReducer} from 'react'
import { BrowserRouter as Router, Route, Routes , useNavigate} from 'react-router-dom'; // Import Routes

import Home from './components/Home/Home';
import Event from './components/Events/Event';
import History from './components/History/History';
import Choose from './components/Choose/Choose';
import User_login1 from './components/User_login/User_login1';
import User_signup from './components/User_signup/User_signup';
import Org_login from './components/Org_login/Org_login';
import Org_signup from './components/Org_signup/Org_signup';
import Donation from './components/Donation/Donation';
import "./assets/scss/app.scss"
import Dashboard from "./pages/Dashboard"
import { fas } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import Header from "./components/Layout/Header"
import Footer from "./components/Layout/Footer"
import SideBarContainer from "./components/Layout/SideBarContainer"
import Transactions from "./pages/Transactions";
import AddEvent from './components/AddEventOrg/AddEventOrg';
import NavbarOrg from './components/NavbarOrg/NavbarOrg';
import Campaign from './components/Campaigns/Campaigns'
import Progress from './components/Progress/Progress';

import { reducer as userReducer, initialState as userInitialState } from './reducers/userReducer'
import { reducer as orgReducer, initialState as orgInitialState } from './reducers/orgReducer'

export const UserContext = createContext()
export const OrgContext = createContext()


const Routing = () => {
  const [userState, userDispatch] = useReducer(userReducer, userInitialState);
  const [orgState, orgDispatch] = useReducer(orgReducer, orgInitialState);
  const navigate = useNavigate();
  
  useEffect(() => {
    console.log("Inside useEffect");
  
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        userDispatch({ type: "USER", payload: parsedUser });
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  
    const storedOrg = localStorage.getItem("org");
    if (storedOrg) {
      try {
        const parsedOrg = JSON.parse(storedOrg);
        orgDispatch({ type: "ORG", payload: parsedOrg });
      } catch (error) {
        console.error("Error parsing org data from localStorage:", error);
      }
    }
  }, []);
  
  
  
  
  return (
    <Routes>
      <Route path="/user" element={<Home />} />
      <Route path="/event" element={<Event />} /> 
      <Route path="/campaign" element={<Campaign />} /> 
      <Route path="/history" element={<History />} /> 
      <Route path="/addevent" element={<AddEvent />} /> 
      <Route path="/org" element={<NavbarOrg />} /> 
      <Route path="/" element={<Choose />} /> 
      <Route path="/User_login" element={<User_login1 />} /> 
      <Route path="/User_signup" element={<User_signup />} /> 
      <Route path="/Org_login" element={<Org_login />} />
      <Route path="/Org_signup" element={<Org_signup />} />
      <Route path="/Donation" element={<Donation />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/Progress" element={<Progress />} />
      <Route path="/transactions" element={<Transactions />} />
      </Routes>
  );
};


function App() {
  const [userState, userDispatch] = useReducer(userReducer, userInitialState);
  const [orgState, orgDispatch] = useReducer(orgReducer, orgInitialState);

  return (
    <UserContext.Provider value={{ state: userState, dispatch: userDispatch }}>
      <OrgContext.Provider value={{ state: orgState, dispatch: orgDispatch }}>
        <Router>
          <Routing />
        </Router>
      </OrgContext.Provider>
    </UserContext.Provider>
  );
}

export default App;



