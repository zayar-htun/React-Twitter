import { Button } from "@mui/material";
import { useContext } from "react";
import { toggleFollower } from "./ApiCall";
import { AuthContext } from "./AuthProvider";

export default function FollowButton({ user }) {
    const { authUser, setAuthUser } = useContext(AuthContext);

    return authUser.following &&
        authUser.following.find(uid => uid === user._id) ? (
        <Button
            size="small"
            edge="end"
            variant="outlined"
            sx={{ borderRadius: 5 }}
            onClick={()=>{
                (async()=>{
                    const result = await toggleFollower(user._id);
                    authUser.following = result.following;
                    setAuthUser({...authUser})
                })();
            }}
        >
            Followed
        </Button>
    ) : (
        <Button
            size="small"
            edge="end"
            variant="contained"
            sx={{ borderRadius: 5 }}
            onClick={()=>{
                (async()=>{
                    const result = await toggleFollower(user._id);
                    authUser.following = result.following;
                    setAuthUser({...authUser})
                })();
            }}
        >
            Follow
        </Button>
    );
}
