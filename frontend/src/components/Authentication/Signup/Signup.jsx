import React from 'react';
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect} from "react";

import axios from "@/APIService/axios";
const LOGIN_URL = 'http://127.0.0.1:8000/auth/';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Signup = () => {
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  //this will happen when the component loads and set to focus to username input
  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    const result = EMAIL_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidEmail(result);
  }, [user])

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPassword(result);
  }, [password])

  useEffect(() => {
    setErrMsg('');
  }, [user, password])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = EMAIL_REGEX.test(user);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2){
      setErrMsg("Unable to sign up with provided credentials.");
      return;
    }
    try{
      const response = await axios.post(LOGIN_URL, 
            JSON.stringify({username: user, password: password}), 
            {
              headers: {'Content-Type': 'application/json'},
              withCredentials: true
            }
          );
          console.log(response.data);
          console.log(response.accessToken)
          console.log(JSON.stringify(response)); 
          setSuccess(true);

          setUser('');
          setPassword('');
    } catch(err){
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
    <>
        {success ? (
            <div>
              <h1>Success!</h1>
                  <span onClick={() => navigate("/")}>Sign In</span>
            </div>
         ) : (
          <div>
            <p ref={errRef} className={errMsg ? "errmsg" : 
            "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Register</h1>
            <p>
                already have an acount? <br />
                    <span onClick={() => navigate("/")}>Sign In</span>
            </p>
              <form onSubmit={handleSubmit}>
                    <label htmlFor="username">
                        Email: 
                        <span className={validEmail ? "valid" : "hide"} />
                        <span className={validEmail || !user ? "hide" : "invalid"} />
                      </label>
                    <input 
                      type="text" 
                      id="username"
                      ref={userRef}
                      autoComplete="off" 
                      onChange={(e) => setUser(e.target.value)}
                      value={user}
                      required
                      aria-invalid={validEmail ? "false" : "true"}
                      aria-describedby = "uidnote"
                      onFocus = {() => setPasswordFocus(true)}
                      onBlur = {() => setUserFocus(false)}
                    />
                    <p id="uidnote" className={userFocus && user && !validEmail ? "instructions" : "offscreen"}>
                    </p>

                    <label htmlFor="password">
                        Password: 
                        <span className={validPassword ? "valid" : "hide"} />
                        <span className={validPassword || !password ? "hide" : "invalid"} />
                      </label>
                    <input 
                      type="password" 
                      id="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      required
                      aria-invalid={validPassword ? "false" : "true"}
                      aria-describedby = "pwdnote"
                      onFocus = {() => setUserFocus(true)}
                      onBlur = {() => setUserFocus(false)}
                    />
                    <p id="pwdnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                    </p>

                    <button disabled = {!validEmail || !validPassword ? true : false}>
                      Log In
                    </button>
                </form>
          </div>
        )}
    </>
  )
}

export default Signup;




