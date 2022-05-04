import React, {useState} from "react";
import { useNavigate } from "react-router-dom";




function Landing() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);

  const logout = () =>{
    localStorage.removeItem("token");
    setSuccess(false);
    navigate("/");
  }


  return (
    <div className="justify-center">
      <h1 className="text-2xl text-center font-bold underline">Welcome User!</h1>
      <div>
          <button 
            className="btn-default rounded-md px-4 py-1 text-white" 
            onClickCapture={logout}>
              Logout
          </button>
          <button 
            className="btn-default rounded-md px-4 py-1 text-white" 
            onClick={()=>navigate("/changepassword/")}>
              Change Password
          </button>
      </div>
    </div>
  );
}

export default Landing;
