import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import SearchIcon from "@mui/icons-material/Search";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import GoBackButton from "../components/GoBackButton";
import UserFilterDialog from "../components/UserFilterDialog";
import { UserDto } from "../models/user.model";
import { gameService } from "../service/game.service";
import { userService } from "../service/user.service";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<UserDto[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const friends = await userService.getFriends();
      setUsers(friends);
    };

    fetchUsers();
  }, []);

  const handlePlayGame = (userId: string) => {
    console.log(`Starting game with user: ${userId}`);
  };

  const handleRandomGame = async () => {
    console.log("Starting random game");
    try {
      const game = await gameService.createOrJoinRoom();
      if (game.playerO === null) {
        console.log("Waiting for another player to join the game");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #42a5f5, #7e57c2)",
        padding: 4,
      }}
    >
      <Typography variant="h4" color="white" fontWeight="bold" gutterBottom>
        Friends List
      </Typography>

      <UserFilterDialog
        open={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />

      <Card
        sx={{ width: "100%", maxWidth: 400, boxShadow: 5, borderRadius: 3 }}
      >
        <CardContent>
          <IconButton color="inherit" onClick={() => setIsPopupOpen(true)}>
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit" onClick={() => setIsPopupOpen(true)}>
            <CircleNotificationsIcon />
          </IconButton>
          {users.length === 0 ? (
            <Typography variant="body1" textAlign="center">
              No friends found.
            </Typography>
          ) : (
            <List>
              {users.map((userDto) => (
                <ListItem
                  key={userDto.user.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    padding: "10px 16px",
                    backgroundColor: userDto.user.online
                      ? "#E8F5E9"
                      : "#F3E5F5",
                    borderRadius: "8px",
                    marginBottom: "8px",
                    boxShadow: 2,
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={`/api/v1/users/avatar/${userDto.user.id}`}
                      alt={userDto.user.username}
                      sx={{ width: 50, height: 50 }}
                    />
                  </ListItemAvatar>

                  <ListItemText
                    primary={
                      userDto.user.username +
                      (userDto.isInGame ? " (In game)" : "")
                    }
                    secondary={
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{
                          color: userDto.user.online ? "green" : "gray",
                          fontWeight: "bold",
                        }}
                      >
                        {userDto.user.online ? "Online" : "Offline"}
                      </Typography>
                    }
                  />

                  {userDto.user.online && !userDto.isInGame && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handlePlayGame(userDto.user.id)}
                      sx={{ textTransform: "none", fontWeight: "bold" }}
                    >
                      Play
                    </Button>
                  )}
                </ListItem>
              ))}
            </List>
          )}
          <Button
            variant="contained"
            color="success"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleRandomGame}
          >
            Random game
          </Button>
          <GoBackButton />
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserList;
