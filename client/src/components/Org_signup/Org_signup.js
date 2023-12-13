import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import M from 'materialize-css';
import './Org_signup.css';

const Org_signup = () => {

    const navigate = useNavigate();
    const [orgname,setUsername] = useState("")
    const [orgemail,setOrgemail] = useState("")
    const [address,setAddress] = useState("")
    const [orgpassword,setOrgpassword] = useState("")
  
    const PostData = (e) => {
      e.preventDefault(); 
      if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(orgemail)) {
          return;
        }
      fetch('/signuporg', {
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            orgname,
            orgemail,
            address,
            orgpassword
          })
        })
          .then(res => res.json())
          .then(data => {
            console.log("Server response:", data);
            // Check if the data indicates success
            if (data.message === "saved succesfully") {
              console.log("Navigating to Org_login");
              navigate("/Org_login");
            } else {
              console.log("Signup was not successful");
              // Handle other scenarios if needed
            }
          })
          .catch(err => {
            console.error("Error during fetch:", err);
            // Handle the error
          });
        
    }

    return(
        <form className="login"  onSubmit={PostData}>
  <p>Please Sign Up</p>
  <input type="text" placeholder="Organization Name" value={orgname} onChange={(e)=>setUsername(e.target.value)}/>
  <input type="text" placeholder="Organization Address" value={address} onChange={(e)=>setAddress(e.target.value)} />
  <input type="text" placeholder="E-mail" value={orgemail} onChange={(e)=>setOrgemail(e.target.value)}/>
  <input type="password" placeholder="Password" value={orgpassword} onChange={(e)=>setOrgpassword(e.target.value)} />
  <input type="submit" value="Sign Up " />
</form>

        );
    };
    
    export default Org_signup;
    