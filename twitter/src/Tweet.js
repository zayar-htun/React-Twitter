import {
    Avatar,
    Box,
    Button,
    ButtonGroup,
    Card,
    CardActionArea,
    CardContent,
    Divider,
    IconButton,
    OutlinedInput,
    Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTweet, postComment } from "./ApiCall";
import {
    ChatBubbleOutline as ChatBubbleOutlineIcon,
    FavoriteBorder as FavoriteBorderIcon
} from '@mui/icons-material'

export default function Tweet({ tweets,updateTweets }) {
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [tweet, setTweet] = useState({});
    const navigate = useNavigate();
    const body = useRef();

    useEffect(() => {
        (async () => {
            const result = await getTweet(id);
            setTweet(result);
            setLoading(false);
        })();
    }, []);
    return (
        !loading && (
            <Box sx={{ my: 3, mx: { lg: 20, md: 5, sm: 5, xs: 3 } }}>
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
                </Card>

                <Box>
                    <form onSubmit={e=>{
                        e.preventDefault();

                        (async()=>{
                            const comment = await postComment(
                                body.current.value,
                                tweet._id
                            )
                            if (!comment) return false;

								const result = await getTweet(id);
								setTweet(result);
								updateTweets(result);
                        })();
                    }}>
                        <OutlinedInput fullWidth multiline placeholder="reply here" inputRef={body}/>
                        <Box
							sx={{
								display: "flex",
								justifyContent: "flex-end",
                                mt:2,mb:3
							}}>
							<Button type="submit" variant="contained">
								Reply
							</Button>
						</Box>
                    </form>
                </Box>

                {tweet.comments.map(comment => {
                    return (
                        <Card sx={{ mb: 2 }} key={comment._id}>
							<CardContent sx={{ display: "flex" }}>
								<Avatar
									alt="Profile"
									sx={{
										width: 48,
										height: 48,
									}}
								/>
								<Box sx={{ ml: 2, flexGrow: 1 }}>
									<Box sx={{ display: "flex", mb: 1 }}>
										<Typography
											sx={{
												fontWeight: "bold",
												fontSize: "0.9em",
											}}>
											{tweet.owner_user[0].name}
										</Typography>
										<Typography
											sx={{
												fontSize: "0.8em",
												ml: 1,
												color: "grey",
											}}>
											@{tweet.owner_user[0].handle}
										</Typography>
										<Typography
											sx={{
												fontSize: "0.8em",
												ml: 1,
												color: 'blue',
											}}>
											{comment.created}
										</Typography>
									</Box>
									<CardActionArea
										onClick={() => {
											navigate(`/tweet/${comment._id}`);
										}}>
										{comment.body}
									</CardActionArea>
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-around",
											mt: 2,
										}}>
										<ButtonGroup>
											<IconButton>
												<FavoriteBorderIcon
													sx={{
														color: 'red',
													}}
												/>
											</IconButton>
											<Button variant="clear">
												{comment.likes.length}
											</Button>
										</ButtonGroup>
										<ButtonGroup>
											<IconButton>
												<ChatBubbleOutlineIcon
													sx={{
														color: 'green',
													}}
												/>
											</IconButton>
											<Button variant="clear">
												{comment.comments.length}
											</Button>
										</ButtonGroup>
									</Box>
								</Box>
							</CardContent>
						</Card>
                    );
                })}
            </Box>
        )
    );
}
