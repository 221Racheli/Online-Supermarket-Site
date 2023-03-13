import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
//import Register from '../register/register';
import axios from "axios";
import "./LoginRegister.scss"

const Login = () => {
  const [user_name, setUser_name] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    // e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3600/users/login', { user_name, password });
      localStorage.setItem("token", JSON.stringify(res.data.accessToken));
      navigate("/home")
    }
    catch (err) {
      setErr(err.response.data?.message);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // handle login logic here
  };
  return (<>
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>
          User Name:
          <input type="text" id="user_name" onChange={(e) => { setUser_name(e.target.value) }}></input>
          {/* <input type="email" value={email} onChange={handleEmailChange} /> */}
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} id="password" onChange={(e) => { setPassword(e.target.value) }}></input>
        </label>
        <br />
        <button onClick={() => handleLogin(user_name, password)} type="submit">Login</button>
        <br />
        <Link to="/register">
          <button>Register</button>
        </Link>
      </form>
    </div>
  </>

  )
}

export default Login

