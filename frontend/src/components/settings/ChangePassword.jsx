import React from "react";
import { useNavigate } from "react-router-dom";
import {useRef, useState, useEffect, useContext} from 'react';
import AuthContext from "@/context/AuthProvider";
import cookie from 'react-cookies';

import axios from "@/APIService/axios";
const PASSWORD_URL = '/api/change-password/';


const ChangePassword = () => {
    const navigate = useNavigate();

    const { currentUser } = useContext(AuthContext);
    const [oldpassword, setOldPass] = useState('');
    const [newpassword, setNewPass] = useState('');
    const [confirmpassword, setRepeatPass] = useState('');

    const token = localStorage.getItem('Token')

    const data = {
        'old_password': 'sometext',
        'new_password1': 'othertext',
        'new_password2': 'othertext'
    };

    var formData = new FormData();

    for(var name in data){
        formData.append(name, data[name]);
    }
    const headers = {
        'Authorization': `Token ${token}`,
    };

  return (
    <form onSubmit={handleSubmit}>
        <label className="my-1 font-semibold text-sm" htmlFor="username">Old Password</label>
        <input 
            className="form-input"
            type="password" 
            id="password"
            placeholder="Old Password"
            onChange={(e) => setOldPass(e.target.value)}
            value={oldpassword}
            required
        />
        <label className="my-1 font-semibold text-sm" htmlFor="username">New Password</label>
        <input 
            className="form-input"
            type="password" 
            id="password"
            placeholder="New Password"
            onChange={(e) => setNewPass(e.target.value)}
            value={newpassword}
            required
        />
        <label className="my-1 font-semibold text-sm" htmlFor="username">Confirm Password</label>
        <input 
            className="form-input"
            type="password" 
            id="password"
            placeholder="Confirm Password"
            onChange={(e) => setRepeatPass(e.target.value)}
            value={confirmpassword}
            required
        />
         <button className="btn btn-default btn-block mt-5">Confirm</button>
    </form>
  );
};

export default ChangePassword;