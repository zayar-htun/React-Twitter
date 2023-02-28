import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
    Avatar,
    Box,
    Button,
    ButtonGroup,
    CardActionArea,
    CardActions,
    Divider,
    IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CommentIcon from "@mui/icons-material/Comment";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

export default function Home({ tweets }) {
    const navigate = useNavigate();
    const {authUser} = React.useContext(AuthContext);
    return (
        <Box sx={{ my: 3, mx: { lg: 20, md: 5, sm: 5, xs: 3 } }}>
            {tweets.map(tweet => {
                return (
                    <Card sx={{ mx: 3, my: 3 }}>
                        <CardContent
                            sx={{ display: "flex", alignItems: "flex-start" }}
                        >
                            <IconButton>
                                <Avatar
                                    alt="Profile"
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        background: "blue",
                                    }}
                                />
                            </IconButton>
                            <Box sx={{ flexGrow: 1, ml: 2 }}>
                                <Box sx={{ display: "flex", mb: 1 }}>
                                    <CardActionArea
                                        sx={{
                                            display: "flex",
                                            justifyContent: "flex-start",
                                            flexWrap: "wrap",
                                        }}
                                        onClick={()=>{
                                            navigate(`/@/${tweet.owner_user[0].handle}`)
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: "bold",
                                                fontSize: "2em",
                                            }}
                                        >
                                            {tweet.owner_user[0].name}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontSize: "0.8em",
                                                ml: 1,
                                                color: "grey",
                                            }}
                                        >
                                            @{tweet.owner_user[0].handle}
                                        </Typography>
                                    </CardActionArea>
                                </Box>
                            </Box>
                            <Typography
                                sx={{
                                    fontSize: "1em",
                                    ml: 1,
                                    color: "blue",
                                }}
                            >
                                {tweet.owner_user[0].created}
                            </Typography>
                        </CardContent>
                        <Typography
                            sx={{
                                fontSize: "1.2em",
                                ml: 5,
                            }}
                        >
                            {tweet.body}
                        </Typography>

                        <Divider />
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-around",
                            }}
                        >
                            <ButtonGroup>
                                <IconButton>
                                    <FavoriteBorderIcon sx={{ color: "red" }} />
                                </IconButton>
                                <Button variant="clear">{tweet.likes.length}</Button>
                            </ButtonGroup>
                            <ButtonGroup>
                                <IconButton>
                                    <CommentIcon sx={{ color: "green" }} />
                                </IconButton>
                                <Button variant="clear">{tweet.comments.length}</Button>
                            </ButtonGroup>
                        </Box>
                    </Card>
                );
            })}
        </Box>
    );
}
