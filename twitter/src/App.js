import React, { useContext, useEffect, useState } from "react";
import Header from "./Header";
import MainDrawer from "./MainDrawer";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Profile from "./Profile";
import { AuthContext } from "./AuthProvider";
import { getTweets, verify } from "./ApiCall";
import Edit from "./Edit";
import { Fab } from "@mui/material";
import {
  Add as AddIcon
} from '@mui/icons-material';
import {useNavigate } from "react-router-dom";
import Add from "./Add";


export default function App() {
    const [drawerState, setDrawerState] = useState(false);
    const { auth, setAuth, authUser, setAuthUser } = useContext(AuthContext);
    const [tweets, setTweets] = useState([]);
    const navigate = useNavigate();
    const toggleDrawer = open => event => {
        if (
            event &&
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setDrawerState(open);
    };

    

    useEffect(() => {
        (async () => {
            const user = await verify();
            if (user) {
                setAuth(true);
                setAuthUser(user);
            }
        })();
    }, [setAuth, setAuthUser]);

    useEffect(() => {
        (async () => {
            const tweets = await getTweets();
            setTweets(tweets);
        })();
    }, []);

    const addTweet = tweet => {
        setTweets([tweet,...tweets])
    }
    return (
        <div>
            <Header setDrawerState={setDrawerState} />
            <MainDrawer drawerState={drawerState} toggleDrawer={toggleDrawer} />
            <Routes>
                <Route path="/" element={<Home tweets={tweets} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/@/:handle" element={<Profile />} />
                <Route path="/edit" element={<Edit />} />
                <Route path="/add" element={<Add addTweet={addTweet}/>}/>
            </Routes>

            <Fab onClick={()=>{
              navigate('/add')
            }} sx={{ position: "fixed", right: 40, bottom: 40 ,bgcolor:'wheat', color:'green'}}>
                <AddIcon/>
            </Fab>
        </div>
    );
}
