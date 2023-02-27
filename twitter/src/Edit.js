import { Alert, Box, Button, OutlinedInput, Typography } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { editProfile } from "./ApiCall";
import { AuthContext } from "./AuthProvider";

export default function Edit() {
    const { authUser, setAuthUser } = useContext(AuthContext);
    const name = useRef();
    const handle = useRef();
    const profile = useRef();
    const password = useRef();
    const [err,setErr] = useState(false);
    const [errMsg,setErrMsg] = useState('');
    const navigate = useNavigate();
  return (
    <Box sx={{my:2 ,mx:2}}>
      <Typography variant="h4" sx={{mb:3}}>Edit Your Profile</Typography>
      {
        err && <Alert severity="warning">{errMsg}</Alert>
      }
      <form onSubmit={e=>{
        e.preventDefault();

        (async()=>{
          const user = await editProfile(
              authUser._id,
              name.current.value,
              profile.current.value,
              password.current.value
          )

          if(user){
              setAuthUser(user);
              navigate('/profile');
              console.log(user);
              
              console.log(authUser);
          }
          else{
              setErr(true);
              setErrMsg('Edit Fail!')
          }
      })();
      }}>
        <OutlinedInput placeholder={authUser.name} inputRef={name} fullWidth sx={{mb:2}}/>
        <OutlinedInput placeholder={authUser.handle} inputRef={handle} disabled fullWidth sx={{mb:2}}/>
        <OutlinedInput placeholder={authUser.profile} inputRef={profile} fullWidth sx={{mb:2}}/>
        <OutlinedInput placeholder='******' inputRef={password} fullWidth sx={{mb:2}}/>

        <Button type="submit" variant="contained">Register</Button>
      </form>
    </Box>
  );
}
