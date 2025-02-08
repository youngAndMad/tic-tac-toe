import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useUser } from "../hooks/useUser";
import { UserDto } from "../models/user.model";
import { userService } from "../service/user.service";

interface UserFilterDialogProps {
  open: boolean;
  onClose: () => void;
}

const UserFilterDialog: React.FC<UserFilterDialogProps> = ({
  open,
  onClose,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<UserDto[]>([]);
  const { user } = useUser();

  const handleSearch = async () => {
    if (searchQuery.trim() === "") return;
    try {
      const filtered = await userService.filterUsers(searchQuery);
      setResults(filtered);
    } catch (error) {
      console.error("Error fetching filtered users:", error);
    }
  };

  const inviteUser = async (userId: string) => {
    try {
      await userService.createFriendship(user?.id!!, userId);
      setResults((prev) =>
        prev.map((user) =>
          user.user.id === userId ? { ...user, friendShip: "PENDING" } : user
        )
      );
    } catch (error) {
      console.error("Error sending invite:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Search Users</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Enter username"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          sx={{ mb: 2, mt: 2 }}
        />
        <List>
          {results.length === 0 ? (
            <ListItem>
              <ListItemText primary="No results found." />
            </ListItem>
          ) : (
            results.map((user) => (
              <ListItem
                key={user.user.id}
                secondaryAction={
                  user.friendshipStatus === "NONE" && (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => inviteUser(user.user.id)}
                    >
                      Invite
                    </Button>
                  )
                }
              >
                <ListItemAvatar>
                  <Avatar
                    src={`/api/v1/users/avatar/${user.user.id}`}
                    alt={user.user.username}
                  />
                </ListItemAvatar>
                <ListItemText primary={user.user.username} />
              </ListItem>
            ))
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
        <Button onClick={handleSearch} variant="contained" color="primary">
          Search
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserFilterDialog;
