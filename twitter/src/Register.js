import { Alert, Box, Button, OutlinedInput, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "./ApiCall";

export default function Register() {
    const name = useRef();
    const handle = useRef();
    const profile = useRef();
    const password = useRef();
    const [err,setErr] = useState(false);
    const [errMsg,setErrMsg] = useState('');
    const navigate = useNavigate();
  return (
    <Box sx={{my:2 ,mx:2}}>
      <Typography variant="h4" sx={{mb:3}}>Register</Typography>
      {
        err && <Alert severity="warning">{errMsg}</Alert>
      }
      <form onSubmit={e=>{
        e.preventDefault();

        (async()=>{
            const result = await register(
                name.current.value,
                handle.current.value,
                profile.current.value,
                password.current.value
            )

            if(!result){
                setErr(true);
                setErrMsg('Check Credentials Again')
            }
            else{
                navigate('/login',{state:'Register Successful!'})
            }
        })();
      }}>
        <OutlinedInput placeholder="name" inputRef={name} fullWidth sx={{mb:2}}/>
        <OutlinedInput placeholder="name" inputRef={handle} fullWidth sx={{mb:2}}/>
        <OutlinedInput placeholder="name" inputRef={profile} fullWidth sx={{mb:2}}/>
        <OutlinedInput placeholder="name" inputRef={password} fullWidth sx={{mb:2}}/>

        <Button type="submit" variant="contained">Register</Button>
      </form>
    </Box>
  );
}
