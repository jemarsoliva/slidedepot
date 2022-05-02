import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/components/Authentication/Login/Login";
import Signup from "@/components/Authentication/Signup/Signup";
import Landing from "@/components/Users/Navbar/Landing";
import UserProfile from "@/pages/Users/UserProfile";
import GuestGallery from "@/components/Guest/Gallery/GuestGallery";
import About from "@/components/About/About";
import AuthContext from "@/context/AuthProvider";
import ProtectedLogin from "@/components/Authentication/ProtectedLogin";

function App() {
  const setAuth = React.useContext(AuthContext);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GuestGallery />} />
        <Route {...<ProtectedLogin/>} path="/login/" element={<Login />}auth={setAuth.auth} />
        <Route path="/about/" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/landing/" element={<Landing />} />
        <Route path="/profile/" element={<UserProfile />} />
      </Routes>


    </BrowserRouter>
  );
}

export default App;
