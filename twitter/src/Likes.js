import {
    Box,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import FollowButton from "./FollowButton";

export default function Likes() {
    const location = useLocation();
    const { users } = location.state;

    return (
        <Box>
            <List>
                {users.map(user => {
                    return (
                        <ListItem key={user._id} secondaryAction={<FollowButton user={user}/>}>
                            <ListItemButton>
                                <ListItemText primary={user.name + '@' + user.handle} secondary={user.profile}/>
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );
}
