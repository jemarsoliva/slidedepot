import React from "react";
import { useNavigate } from "react-router-dom";
import {useRef, useState, useEffect, useContext} from 'react';
import AuthContext from "@/context/AuthProvider";
import cookie from 'react-cookies';

import axios from "@/APIService/axios";
import Navbar from "@/components/Guest/Navbar/Navbar";
import Landing from "@/components/Users/Navbar/Landing";
const LOGIN_URL = '/auth/';



const Login = () => {
  const navigate = useNavigate();


  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState('');
  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrMsg('');
  }, [user, password])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post(LOGIN_URL, 
            JSON.stringify({username: user, password: password}), 
            {
              headers:{'Content-Type': 'application/json'},
              withCredentials: true
            }
          );
          const Token = response?.data?.token;
          setAuth({username, password, Token});
          setUser('');
          setPassword('');
          
          localStorage.setItem("token",Token);
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
      <div className="w-screen h-screen grid place-items-center font-font">
          {success ? (
            <Landing />
         ) : (
           <div className="w-96 border border-gray-200 py-10 px-10 rounded-sm shadow-md">
              <Navbar />
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                <h1 className="text-3xl font-semibold mb-2">Log In</h1>
                <p className="mb-5">
                  Don't have an account?{" "}
                  <span
                  className="font-thin-600 underline cursor-pointer text-purple-800"
                  onClick={() => navigate("/signup/")}>Sign up</span>
                </p>
                <form className="flex flex-col" onSubmit={handleSubmit}>
                    <label className="my-1 font-semibold text-sm" htmlFor="username">Email Address</label>
                    <input 
                      className="form-input"
                      type="text" 
                      id="username"
                      placeholder="Email Address"
                      ref={userRef}
                      autoComplete="off" 
                      onChange={(e) => setUser(e.target.value)}
                      value={user}
                      required
                    />

                    <label className="my-1 font-semibold text-sm" htmlFor="password">Password</label>
                    <input 
                      className="form-input"
                      type="password" 
                      id="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      required
                    />
                    <button className="btn btn-default btn-block mt-5">Log In</button>
                </form>
            </div>
         )}
    </div>
  )
}

export default Login;
