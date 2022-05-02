import React from "react";
import { useNavigate } from "react-router-dom";
import {useRef, useState, useEffect, useContext} from 'react';
import AuthContext from "@/context/AuthProvider";
import cookie from 'react-cookies';

const ChangeEmail = () => {
    const { currentUser, setLoading, setAlert, setModal, modal } = useAuth();
    const emailRef = useRef();

    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateEmail(currentUser, emailRef.current.value);
      setModal({ ...modal, isOpen: false });
      setAlert({
        isAlert: true,
        severity: 'success',
        message: 'Your email has been updated',
        timeout: 8000,
        location: 'main',
      });
    } catch (error) {
      setAlert({
        isAlert: true,
        severity: 'error',
        message: error.message,
        timeout: 5000,
        location: 'modal',
      });
      console.log(error);
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent dividers>
        <DialogContentText>Please Enter your new email:</DialogContentText>
        <EmailField {...{ emailRef, defaultValue: currentUser?.email }} />
      </DialogContent>
      <DialogActions>
        <SubmitButton />
      </DialogActions>
    </form>
  );
};

export default ChangeEmail;