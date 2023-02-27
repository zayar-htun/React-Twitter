import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import MainDrawer from "./MainDrawer";
import {Route, Routes}  from 'react-router-dom';
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import { AuthContext } from "./AuthProvider";
import { verify } from "./ApiCall";
import Edit from "./Edit";

export default function App() {
  const [drawerState, setDrawerState] = useState(false);
  const { auth, setAuth, authUser, setAuthUser } = useContext(AuthContext);
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState(open);
  };

  useEffect(()=>{
    (async()=>{
      const user = await verify();
      if(user){
        setAuth(true);
        setAuthUser(user);
      }
    })();
  },[setAuth,setAuthUser])
  return (
    <div>
      <Header setDrawerState={setDrawerState} />
      <MainDrawer drawerState={drawerState} toggleDrawer={toggleDrawer}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/edit" element={<Edit/>}/>
      </Routes>
    </div>
  );
}
