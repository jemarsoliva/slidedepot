import React from "react";
import { useNavigate } from "react-router-dom";
import {useRef, useState, useEffect, useContext} from 'react';
import AuthContext from "@/context/AuthProvider";
import cookie from "react-cookies";

import axios from "@/APIService/axios";
const LOGIN_URL = '/auth/';



const Login = () => {
  const navigate = useNavigate();


  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [token, setToken] = useState('');
  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [user, password])

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(user, password);
    try{
      const response = await axios.post(LOGIN_URL, 
            JSON.stringify({username: user, password: password}), 
            {
              headers: {"X-CSRFToken": cookie.load('csrftoken'), 'Content-Type': 'application/json'},
              withCredentials: true
            }
          );
          // console.log(JSON.stringify(response?.data));
          // console.log(JSON.stringify(response));
          const Token = JSON.stringify(response?.data?.token);
          setAuth({username, password, Token});
          setUser('');
          setPassword('');
          // setSuccess(true);
          localStorage.setItem("Token",Token);
          setToken(Token)
          navigate("/landing/")
          
    }catch(err){
      if(!err?.response){
        setErrMsg('No server Response');
      }else if (err.response?.status === 400){
        setErrMsg('Unable to log in with provided credentials.');
      }else if (err.response?.status === 401){
        setErrMsg('Unauthorized');
      }else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }

  }

  return (
    <div>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <h1>Log In</h1>
        <p>
          Don't have an account?
          <span onClick={() => navigate("/signup/")}>Sign up</span>
        </p>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Email</label>
            <input 
              type="text" 
              id="username"
              ref={userRef}
              autoComplete="off" 
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />

            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button>Log In</button>
        </form>
    </div>
  )
}

export default Login;
