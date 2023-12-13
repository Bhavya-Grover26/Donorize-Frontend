import React, { useState , useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import M from 'materialize-css';
import './User_signup.css';
import { UserContext } from '../../App'

export const User_signup = () => {
  const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [username,setUsername] = useState("")
  const [password,setPasword] = useState("")
  const [email,setEmail] = useState("")

  const PostData = (e) => {
    e.preventDefault();  
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        M.toast({ html: 'Invalid email', classes: 'red darken-3' });
        return;
      }
    fetch('/signupuser', {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          email,
          password
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log("Server response:", data);
          // Check if the data indicates success
          if (data.success) {
            M.toast({ html: data.message, classes: 'green darken-1' });
            const userData = {
              _id: data.user._id,
              name: data.user.username,
              // Add other properties you need
            };
            dispatch({ type: 'USER', payload: userData });
            console.log("Navigating to User_login");
            navigate("/User_login");
          } else {
            M.toast({ html: data.error, classes: 'red darken-3' });
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
        <form className="login" onSubmit={PostData}>
  <p>Please Sign Up</p>
  <input type="text" placeholder="User Name"  value={username} onChange={(e)=>setUsername(e.target.value)} />
  <input type="text" placeholder="E-mail" value={email} onChange={(e)=>setEmail(e.target.value)} />
  <input type="password" placeholder="Password" value={password} onChange={(e)=>setPasword(e.target.value)}/>
  <input type="submit" value="Sign Up " />
</form>

        );
    };
    
    export default User_signup;
    