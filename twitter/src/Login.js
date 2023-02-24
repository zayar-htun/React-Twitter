import { Alert, Box, OutlinedInput, Button } from "@mui/material";
import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login } from "./ApiCall";
export default function Login() {
  const handle = useRef();
  const password = useRef();
  const location = useLocation();
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  return (
    <Box>
      <h1>Hello Login</h1>
      {location.state && <Alert severity="success">{location.state}</Alert>}
      <form
        onSubmit={(e) => {
          e.preventDefault();

          (async()=>{
            const user = await login(
              handle.current.value,
              password.current.value
            )

            if(!user){
              setErr(true)
              setErrMsg("Login Fail!!!")
            }
            else{
              navigate('/')
            }
          })();

        }}
      >
        <OutlinedInput
          placeholder="name"
          inputRef={handle}
          fullWidth
          sx={{ mb: 2 }}
        />
        <OutlinedInput
          placeholder="name"
          inputRef={password}
          fullWidth
          sx={{ mb: 2 }}
        />

        <Button type="submit" variant="contained">
          Login
        </Button>
      </form>
    </Box>
  );
}
