import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Button,
    Drawer,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { Login as LoginIcon, Logout as LogoutIcon } from "@mui/icons-material";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HomeIcon from '@mui/icons-material/Home';

export default function MainDrawer({ toggleDrawer, drawerState }) {
    const { auth, setAuth, authUser, setAuthUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const list = anchor => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <Box sx={{ height: 250, bgcolor: "grey" }}></Box>
            {auth ? (
                
                <List>
                    {authUser.name}@{authUser.handle}
                  <ListItem disablePadding>
                    <ListItemButton
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                </ListItem>
                <Divider />
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={() => {
                                navigate("/profile");
                            }}
                        >
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={() => {
                                setAuth(false);
                                setAuthUser({});
                                localStorage.removeItem("token");
                                navigate("/");
                            }}
                        >
                            <ListItemIcon>
                                <LogoutIcon />
                            </ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </ListItem>
                </List>
            ) : (
                <List>
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={() => {
                                navigate("/register");
                            }}
                        >
                            <ListItemIcon>
                                <PersonAddIcon />
                            </ListItemIcon>
                            <ListItemText primary="Register" />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={() => {
                                navigate("/login");
                            }}
                        >
                            <ListItemIcon>
                                <LoginIcon />
                            </ListItemIcon>
                            <ListItemText primary="Login" />
                        </ListItemButton>
                    </ListItem>
                </List>
            )}
        </Box>
    );

    return (
        <React.Fragment>
            <Drawer
                anchor="left"
                open={drawerState}
                onClose={toggleDrawer(false)}
            >
                {list()}
            </Drawer>
        </React.Fragment>
    );
}
