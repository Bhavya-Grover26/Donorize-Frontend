import React, { useState , useContext} from 'react';
import './User_login1.css';
import M from 'materialize-css';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App'

const User_login1 = () => {
    const { dispatch } = useContext(UserContext);
  const navigate = useNavigate();
  const [username,setUsername] = useState("")
  const [password,setPasword] = useState("")


  const PostData = (e) => {
    e.preventDefault();  
    console.log("Attempting to log in with username:", username);
    console.log("Hello")

    fetch('/signinuser', {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            username,
            password
        })
    })
    .then(res => res.json())
    .then(data => {
        const { token, user } = data;
        localStorage.setItem('jwt', token);
        console.log("Server response:", data);
        if (data.error) {
          M.toast({ html: data.error, classes: 'red darken-3' });
            console.log("Login error:", data.error);
        } else {
            console.log("Navigating to /user");
            const userData = {
                _id: data.user._id,
                username: data.user.username,
                // Add other properties you need
              };
              dispatch({ type: 'USER', payload: userData });
        
              // Pass the extracted data to the user page
              navigate("/user", { state: { user: userData } });
        }
    })
    .catch(err => {
        console.error("Error during fetch:", err);
    });
};




    return(
        <form className="login"  onSubmit={PostData}>
  <p>Please log in</p>
  <input type="text" placeholder="User Name" value={username} onChange={(e)=>setUsername(e.target.value)} />
  <input type="password" placeholder="Password" value={password} onChange={(e)=>setPasword(e.target.value)}  />
  <input type="submit" value="Log In" />
  <div className="links">
    <a href="#">Forgot password</a>
    <Link to='/User_signup'>Register</Link>
  </div>
</form>

        );
    };
    
    export default User_login1;
    