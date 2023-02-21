import { Alert } from "@mui/material"
import { useLocation } from "react-router-dom"
export default function Login(){
    const location = useLocation();
    return(
        <div>
            <h1>Hello Login</h1>
            {
                location.state && <Alert severity="success">{location.state}</Alert>
            }
        </div>
    )
}