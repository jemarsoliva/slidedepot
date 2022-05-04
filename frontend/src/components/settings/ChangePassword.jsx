import React from "react";
import { useState } from 'react';
import cookie from 'react-cookies';

import axios from "@/APIService/axios";
const PASSWORD_URL = '/api/change-password/';


export default function ChangePassword() {
    const [user, setUser] = useState({
    old_password: "",
    new_password: "",
    // confirm_password: "",
    });

    const updatePass = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
    };
    const submitHandler = async (e) => {

    e.preventDefault();
    // if(new_password === confirm_password){
    //     setErrMsg("password_mismatch");
    //     return;
    // }
    try{
        const response = await axios.put(PASSWORD_URL, 
              JSON.stringify({old_password: user.old_password, new_password: user.new_password}), 
              {
                headers: {Authorization:`Token ${localStorage.getItem("token")}`, 'Content-Type': 'application/json'},
              }
            );
            const Token = JSON.stringify(response?.data?.token)
      } 
        catch(error){
            console.log(error)
            alert(error)
          }
    };

  return (
      <div>
        <form onSubmit={submitHandler}>  
            <label className="my-1 font-semibold text-sm">Old Password</label>
            <input 
                id="old_password"
                type="password"
                name="old_password"
                required
                autoFocus
                value={user.old_password}
                onChange={updatePass}
            />
            <label className="my-1 font-semibold text-sm">New Password</label>
            <input 
                id="new_password"
                name="new_password"
                type="password"
                onChange={updatePass}
                value={user.new_password}
                required
            />
            {/* <label className="my-1 font-semibold text-sm" htmlFor="username">Confirm Password</label>
            <input 
                id="confirm_password"
                label="Confirm Password"
                name="confirm_password"
                type="password"
                placeholder="Confirm Password"
                onChange={updatePass}
                value={user.confirm_password}
                required
            /> */}
            <button className="btn-default rounded-md px-4 py-1 text-white" >Update</button>
        </form>
    </div>
  );
};
