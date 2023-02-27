import { useContext } from "react";
import { AuthContext } from "./AuthProvider";

export default function Home(){
    const {auth,setAuth,authUser,setAuthUser} = useContext(AuthContext);
    return(
        <div>
            {
                auth ? authUser.name : 'guest User'
            }
        </div>
    )
}