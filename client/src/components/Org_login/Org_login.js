import React, { useState , useContext, } from 'react';
import './Org_login.css';
import {OrgContext} from '../../App'
import M from 'materialize-css';
import { Link, useNavigate } from 'react-router-dom';

const Org_login = () => {
  const {state,dispatch} = useContext(OrgContext)
  const navigate = useNavigate();
  const [orgname,setOrgname] = useState("")
  const [orgpassword,setOrgpassword] = useState("")


  const PostData = (e) => {
    e.preventDefault();  
    console.log("Attempting to log in with orgame:", orgname);
    console.log("Hello")

    fetch('/signinorg', {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            orgname,
            orgpassword
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log("Server response:", data);
        if (data.error) {
          M.toast({ html: data.error, classes: 'red darken-3' });
            console.log("Login error:", data.error);
        } else {
            localStorage.setItem("jwt", (data.token))
            localStorage.setItem("org", JSON.stringify(data.org));
            dispatch({type:"ORG",payload:data.org});
            console.log("Navigating to /user");
            navigate("/Dashboard");
        }
    })
    .catch(err => {
        console.error("Error during fetch:", err);
    });
};

    return(
        <form className="login" onSubmit={PostData}>
  <p>Please log in</p>
  <input type="text" placeholder="User Name" value={orgname} onChange={(e)=>setOrgname(e.target.value)} />
  <input type="password" placeholder="Password" value={orgpassword} onChange={(e)=>setOrgpassword(e.target.value)}/>
  <input type="submit" value="Log In" />
  <div className="links">
    <a href="#">Forgot password</a>
    <Link to='/Org_signup'>Register</Link>
  </div>
</form>

        );
    };
    
    export default Org_login;
    