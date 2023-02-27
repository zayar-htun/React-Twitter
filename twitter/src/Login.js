import { Alert, Box, OutlinedInput, Button } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login, verify } from "./ApiCall";
import { AuthContext } from "./AuthProvider";
export default function Login() {
  const handle = useRef();
  const password = useRef();
  const location = useLocation();
  const [err, setErr] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const {auth,setAuth,authUser,setAuthUser} = useContext(AuthContext);
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
              setAuth(true);
              const user = await verify();
              setAuthUser(user);
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
