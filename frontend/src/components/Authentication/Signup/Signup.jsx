import React from 'react';
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect} from "react";
import cookie from 'react-cookies';
import Login from "@/components/Authentication/Login/Login";

import Alert from '@mui/material/Alert';
import InfoIcon from '@mui/icons-material/InfoOutlined';

import axios from "@/APIService/axios";
import Navbar from '@/components/Guest/Navbar/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
const REGISTER_URL = '/api/users/';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

const Signup = () => {
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  //this will happen when the component loads and set to focus to username input
  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    console.log(result);
    console.log(email);
    setValidEmail(result);
  }, [email])

  useEffect(() => {
    const result = PWD_REGEX.test(password);
    console.log(result);
    console.log(password);
    setValidPassword(result);
  }, [password])

  useEffect(() => {
    const result = first_name;
    console.log(result);
    console.log(first_name);
    setFirstName(result);
  }, [first_name])

  useEffect(() => {
    const result = last_name;
    console.log(result);
    console.log(last_name);
    setLastName(result);
  }, [last_name])

  useEffect(() => {
    setErrMsg('');
  }, [email, password, first_name, last_name])

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = EMAIL_REGEX.test(email);
    const v2 = PWD_REGEX.test(password);
    if (!v1 || !v2){
      setErrMsg("Unable to sign up with provided credentials.");
      return;
    }
    try{
      const response = await axios.post(REGISTER_URL, 
            JSON.stringify({email: email, password: password, first_name: first_name, last_name: last_name}), 
            {
              headers: {"X-CSRFToken": cookie.load('csrftoken'), 'Content-Type': 'application/json'},
              withCredentials: true
            }
          );
          console.log(response.data);
          console.log(response.accessToken)
          console.log(JSON.stringify(response)); 
          setSuccess(true);

          setEmail('');
          setPassword('');
          navigate("/login/")
    } catch(err){
      if(!err?.response){
        setErrMsg('No server Response');
      }else if (err.response?.status === 400){
        setErrMsg('Unable to log in with provided credentials.');
      }else if (err.response?.status === 401){
        setErrMsg('Unauthorized');
      }else {
        setErrMsg('Register Failed');
      }
      errRef.current.focus();
    }
  }

  return (
    <div className='w-screen h-screen grid place-items-center font-font'>
        {success ? (
            <div>
              <Login />
            </div>
         ) : (
          <div className='w-96 border border-gray-200 py-10 px-10 rounded-sm shadow-md'>
            <Navbar />
            <p ref={errRef} className={errMsg ? "errmsg" : 
            "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1 className='text-3xl font-semibold mb-2'>Sign up</h1>
            <p className='mb-5'>
                Already have an acount? {" "}
                    <span className='font-thin-600 underline cursor-pointer text-purple-800' onClick={() => navigate("/login")}>Sign In</span>
            </p>
              <form className='flex flex-col' onSubmit={handleSubmit}>
                  <label className='my-1 font-semibold text-sm' htmlFor="first_name">
                        First Name: 
                      </label>
                    <input 
                      className='form-input'
                      placeholder='First Name'
                      type="text" 
                      id="first_name"
                      ref={userRef}
                      autoComplete="off" 
                      onChange={(e) => setFirstName(e.target.value)}
                      value={first_name}
                      required
                    /> 
                    
                  <label className='my-1 font-semibold text-sm' htmlFor="last_name">
                        Last Name: 
                      </label>
                    <input 
                      className='form-input'
                      placeholder='Last Name'
                      type="text" 
                      id="last_name"
                      ref={userRef}
                      autoComplete="off" 
                      onChange={(e) => setLastName(e.target.value)}
                      value={last_name}
                      required
                    /> 
                   
                    <label className='my-1 font-semibold text-sm' htmlFor="username">
                        Email: 
                        <span className={validEmail ? "valid" : "hide"}>
                          {/* <FontAwesomeIcon icon={faCheck} /> */}
                        </span>
                        
                        <span className={validEmail || !email ? "hide" : "invalid"}>
                          {/* <FontAwesomeIcon icon={faTimes} />  */}
                        </span>
                      </label>
                    <input 
                      className='form-input'
                      placeholder='Email'
                      type="email" 
                      id="username"
                      ref={userRef}
                      autoComplete="off" 
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      required
                      aria-invalid={validEmail ? "false" : "true"}
                      aria-describedby = "uidnote"
                      onFocus = {() => setPasswordFocus(true)}
                      onBlur = {() => setUserFocus(false)}
                    />

                    <p id="uidnote" className={userFocus && email && !validEmail ? "instructions" : "offscreen"}>
                      {/* <InfoIcon /> {" "}
                     <span className='text-sm'>
                       
                       4 to 24 character. <br />
                      Must begin with a letter. <br />
                      Letters, numbers, underscores, hyphens allowed.
                       
                       </span>  */}
                    </p>

                    <label className='my-1 font-semibold text-sm' htmlFor="password">
                        Password: 
                        <span className={validPassword ? "valid" : "hide"}>
                          {/* <FontAwesomeIcon icon={faCheck} /> */}
                        </span>
                        <span className={validPassword || !password ? "hide" : "invalid"}>
                          {/* <FontAwesomeIcon icon={faTimes} /> */}
                        </span>
                      </label>
                    <input 
                      className='form-input'
                      placeholder='Password'
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
                    <InfoIcon /> {" "}
                     <span className='text-sm'>
                       
                       4 to 8 character. <br />
                      Must include uppercase and lowecase letters, a number and a special character. <br />
                      Allowed special characters: <span aria-label='exclamation'>!</span>
                      <span aria-label='at symbol'>@</span><span aria-label='hashtag'>#</span>
                      <span aria-label='dollar sign'>$</span>
                       
                       </span>
                       
                    </p>
                    <div className='flex items-center mt-3'>
                      <input type="checkbox" />
                      <h1 className='mx-1 font-normal text-sm'>
                        I agree to the {" "}
                        <span className='underline'>Terms and Condition</span>
                      </h1>
                    </div>
                    <button className='btn btn-block btn-default mt-5' disabled = {!validEmail || !validPassword ? true : false}>
                      Sign Up
                    </button>
                </form>
          </div>
        )}
    </div>
  )
}

export default Signup;




