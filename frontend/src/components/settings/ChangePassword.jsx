import React from "react";
import {useRef, useState} from 'react';
import cookie from 'react-cookies';

import axios from "@/APIService/axios";
const PASSWORD_URL = '/api/change-password/';


export default function ChangePassword() {
    const [user, setUser] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
    });

    const [errMsg, setErrMsg] = useState('');
    const updatePass = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
    };
    const submitHandler = async (e) => {

    e.preventDefault();
    if(new_password === confirm_password){
        setErrMsg("password_mismatch");
        return;
    }
    try{
        const response = await axios.put(PASSWORD_URL, 
              JSON.stringify({old_password: user.old_password, new_password: user.new_password}), 
              {
                headers: {"X-CSRFToken": cookie.load('csrftoken'), 'Content-Type': 'application/json'},
                withCredentials: true
              }
            );
            const Token = JSON.stringify(response?.data?.token);
            // setUser({ ...user, old_password: user.old_password, new_password: user.new_password});
            localStorage.setItem("token",Token);
            setToken(Token)
            console.log(user.new_password, user.confirm_password);
            navigate("/landing/")
            
      } 
        catch(err){
            if(!err?.response){
              setErrMsg('No server Response');
            }else if (err.response?.status === 400){
              setErrMsg('Unable to log in with provided credentials.');
            }else if (err.response?.status === 401){
              setErrMsg('Unauthorized');
            }else {
              setErrMsg('Update Failed');
            }
          }
    };

  return (
      <div>
        <form onSubmit={submitHandler}>  
            <label className="my-1 font-semibold text-sm" htmlFor="username">Old Password</label>
            <input 
                id="old_password"
                label="Old Password"
                type="password"
                name="old_password"
                required
                autoFocus
                value={user.old_password}
                onChange={updatePass}
            />
            <label className="my-1 font-semibold text-sm" htmlFor="username">New Password</label>
            <input 
                id="new_password"
                label="New Password"
                name="new_password"
                type="password"
                onChange={updatePass}
                value={user.new_password}
                required
            />
            <label className="my-1 font-semibold text-sm" htmlFor="username">Confirm Password</label>
            <input 
                id="confirm_password"
                label="Confirm Password"
                name="confirm_password"
                type="confirm_password"
                placeholder="Confirm Password"
                onChange={updatePass}
                value={user.confirm_password}
                required
            />
            <button className="btnConfirm">Confirm</button>
        </form>
    </div>
  );
};
