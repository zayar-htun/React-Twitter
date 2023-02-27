import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { Box } from "@mui/system";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const { auth, setAuth, authUser, setAuthUser } = React.useContext(AuthContext);
    const navigate = useNavigate();
    return (
        <Container maxWidth="sm" sx={{ mt: 4 }}>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140, bgcolor: "grey" }}
                    title="green iguana"
                />
                <CardContent>
                    <Box sx={{display:'flex', justifyContent:'space-between',alignItems:'center'}}>
                        <Box>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                                sx={{display:'inline'}}
                            >
                                {authUser.name}
                                
                            </Typography>
                            <Typography
                                gutterBottom
                                variant="h8"
                                component="div"
                                sx={{display:'inline'}}
                            >
                                 @{authUser.handle}
                                
                            </Typography>
                        </Box>
                        <Box>
                            <CardActions  onClick={()=>{
                                    navigate('/edit')
                                }}>
                                <Button size="small">Edit</Button>
                                <Button onClick={()=>{
                                    console.log(authUser);
                                }}>Show</Button>
                            </CardActions>
                        </Box>
                    </Box>

                    <Typography variant="body2" color="text.secondary">
                        {authUser.profile}
                    </Typography>
                </CardContent>
            </Card>
        </Container>
    );
}
