import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function ProfilePage() {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [username, setUsername] = useState("Player1");
  const [stats, setStats] = useState({ gamesPlayed: 25, wins: 15, losses: 10 });
  const [open, setOpen] = useState(false);

  const winRate = stats.gamesPlayed
    ? ((stats.wins / stats.gamesPlayed) * 100).toFixed(1)
    : "0";

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setProfileImage(reader.result as string);
        };
        reader.readAsDataURL(file);
      }
    },
  });

  // Open and close edit dialog
  const handleEditClick = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle form submission
  const handleSave = () => {
    setStats({
      gamesPlayed: Number(editedStats.gamesPlayed),
      wins: Number(editedStats.wins),
      losses: Number(editedStats.losses),
    });
    setUsername(editedUsername);
    setOpen(false);
  };

  // Temporary values while editing
  const [editedUsername, setEditedUsername] = useState(username);
  const [editedStats, setEditedStats] = useState(stats);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#f5f5f5",
        padding: 3,
      }}
    >
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Profile
      </Typography>

      <Card sx={{ width: 350, padding: 3, textAlign: "center", boxShadow: 3 }}>
        <CardContent>
          {/* Profile Image */}
          <Box {...getRootProps()} sx={{ cursor: "pointer", mb: 2 }}>
            <input {...getInputProps()} />
            <Avatar
              src={profileImage || "/default-avatar.png"}
              alt="Profile"
              sx={{ width: 120, height: 120, margin: "auto", boxShadow: 3 }}
            />
            <Typography variant="body2" color="textSecondary">
              Click to upload a new photo
            </Typography>
          </Box>

          {/* Username */}
          <Typography variant="h5" fontWeight="bold" mt={1}>
            {username}
          </Typography>

          {/* Statistics */}
          <Box mt={3} textAlign="left">
            <Typography variant="body1">
              🎮 Games Played: {stats.gamesPlayed}
            </Typography>
            <Typography variant="body1" color="green">
              🏆 Wins: {stats.wins}
            </Typography>
            <Typography variant="body1" color="red">
              ❌ Losses: {stats.losses}
            </Typography>
            <Typography variant="body1" fontWeight="bold" mt={1}>
              🔥 Win Rate: {winRate}%
            </Typography>
          </Box>

          {/* Edit Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleEditClick}
          >
            Edit Profile
          </Button>
        </CardContent>
      </Card>

      {/* Edit Profile Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogContent>
          <TextField
            label="Username"
            fullWidth
            margin="dense"
            value={editedUsername}
            onChange={(e) => setEditedUsername(e.target.value)}
          />
          <TextField
            label="Games Played"
            fullWidth
            margin="dense"
            type="number"
            value={editedStats.gamesPlayed}
            onChange={(e) =>
              setEditedStats({
                ...editedStats,
                gamesPlayed: Number(e.target.value),
              })
            }
          />
          <TextField
            label="Wins"
            fullWidth
            margin="dense"
            type="number"
            value={editedStats.wins}
            onChange={(e) =>
              setEditedStats({ ...editedStats, wins: Number(e.target.value) })
            }
          />
          <TextField
            label="Losses"
            fullWidth
            margin="dense"
            type="number"
            value={editedStats.losses}
            onChange={(e) =>
              setEditedStats({ ...editedStats, losses: Number(e.target.value) })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
