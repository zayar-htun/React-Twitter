import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Drawer
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import {
    Login as LoginIcon
} from "@mui/icons-material"
import React from "react";
import { useNavigate } from "react-router-dom";

export default function MainDrawer({toggleDrawer,drawerState}) {

  const navigate = useNavigate();
  const list = (anchor) => (
    <Box
    sx={{width:250}}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        
          <ListItem disablePadding>
            <ListItemButton onClick={()=>{navigate('/register')}}>
              <ListItemIcon><PersonAddIcon/></ListItemIcon>
              <ListItemText primary='Register' />
            </ListItemButton>
          </ListItem>
      
      </List>

      <Divider />

      <List>
        
          <ListItem disablePadding>
            <ListItemButton onClick={()=>{navigate('/login')}}>
              <ListItemIcon><LoginIcon/></ListItemIcon>
              <ListItemText primary='Login' />
            </ListItemButton>
          </ListItem>
      
      </List>
      
    </Box>
  );

  return (
    <React.Fragment >
    <Drawer
      anchor='left'
      open={drawerState}
      onClose={toggleDrawer(false)}    >
      {list()}
    </Drawer>
  </React.Fragment>
  );
}
