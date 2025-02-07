import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import GoBackButton from "../components/GoBackButton";
import { User } from "../models/user.model";
import { userService } from "../service/user.service";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

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

      <Card
        sx={{ width: "100%", maxWidth: 400, boxShadow: 5, borderRadius: 3 }}
      >
        <CardContent>
          {users.length === 0 ? (
            <Typography variant="body1" textAlign="center">
              No friends found.
            </Typography>
          ) : (
            <List>
              {users.map((user) => (
                <ListItem
                  key={user.id}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    padding: "10px 16px",
                    backgroundColor: user.online ? "#E8F5E9" : "#F3E5F5",
                    borderRadius: "8px",
                    marginBottom: "8px",
                    boxShadow: 2,
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={`/api/v1/users/avatar/${user.id}`}
                      alt={user.username}
                      sx={{ width: 50, height: 50 }}
                    />
                  </ListItemAvatar>

                  <ListItemText
                    primary={user.username}
                    secondary={
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{
                          color: user.online ? "green" : "gray",
                          fontWeight: "bold",
                        }}
                      >
                        {user.online ? "Online" : "Offline"}
                      </Typography>
                    }
                  />

                  {user.online && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handlePlayGame(user.id)}
                      sx={{ textTransform: "none", fontWeight: "bold" }}
                    >
                      Play
                    </Button>
                  )}
                </ListItem>
              ))}
            </List>
          )}
          <Button variant="contained" color="success" fullWidth sx={{ mt: 2 }}>
            Random game
          </Button>
          <GoBackButton />
        </CardContent>
      </Card>
    </Box>
  );
};

export default UserList;
