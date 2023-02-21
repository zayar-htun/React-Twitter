import React, { useState } from "react";
import Header from "./Header";
import MainDrawer from "./MainDrawer";
import {Route, Routes}  from 'react-router-dom';
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";

export default function App() {
  const [drawerState, setDrawerState] = useState(false);
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

  return (
    <div>
      <Header setDrawerState={setDrawerState} />
      <MainDrawer drawerState={drawerState} toggleDrawer={toggleDrawer}/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  );
}
