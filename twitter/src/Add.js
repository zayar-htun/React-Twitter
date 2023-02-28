import { Alert, Box, OutlinedInput, Button } from "@mui/material";
import { useContext, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { login, postTweet, verify } from "./ApiCall";
import { AuthContext } from "./AuthProvider";
export default function Add({addTweet}) {
    const body = useRef();
    const navigate = useNavigate();
    const [err, setErr] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const { auth, setAuth, authUser, setAuthUser } = useContext(AuthContext);
    return (
        <Box sx={{ mx: 3, my: 3 }}>
            {err && (
                <Alert severity="warning" sx={{ mb: 4 }}>
                    {errMsg}
                </Alert>
            )}
            <form
                onSubmit={e => {
                    e.preventDefault();

                    (async () => {
                        if (!body) {
                            setErr(true);
                            setErrMsg("Type Something to tweet");
                            return false;
                        }

                        const tweet = await postTweet(body.current.value);
                        if (!tweet) {
                            setErr(true);
                            setErrMsg(
                                "Something went wrong, please try again."
                            );
                            return false;
                        }
                        addTweet(tweet)
                        navigate('/')
                    })();
                }}
            >
                <OutlinedInput
                    placeholder="what is on your mind!!!"
                    inputRef={body}
                    fullWidth
                    multiline
                    sx={{ mb: 2 }}
                />

                <Button type="submit" variant="contained">
                    Upload
                </Button>
            </form>
        </Box>
    );
}
