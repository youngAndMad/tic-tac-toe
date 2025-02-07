import { Avatar, Box, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useUser } from "../hooks/useUser";
import { userService } from "../service/user.service";

export default function ProfilePage() {
  const { user, reload } = useUser();
  const [stats, setStats] = useState({ gamesPlayed: 25, wins: 15, losses: 10 });
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const winRate = stats.gamesPlayed
    ? ((stats.wins / stats.gamesPlayed) * 100).toFixed(1)
    : "0";

  useEffect(() => {
    if (user?.id) {
      userService.downloadAvatar(user.id).then((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        setAvatarUrl(imageUrl);
      });
    }
  }, [user?.id]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        userService.uploadAvatar(file).then(() => {
          reload(); // Reload user data
        });
      }
    },
  });

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
          <Box {...getRootProps()} sx={{ cursor: "pointer", mb: 2 }}>
            <input {...getInputProps()} />
            <Avatar
              src={avatarUrl || "/default-avatar.png"} // Fallback to default image
              alt="Profile"
              sx={{ width: 120, height: 120, margin: "auto", boxShadow: 3 }}
            />
            <Typography variant="body2" color="textSecondary">
              Click to upload a new photo
            </Typography>
          </Box>

          <Typography variant="h5" fontWeight="bold" mt={1}>
            {user?.username}
          </Typography>

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
        </CardContent>
      </Card>
    </Box>
  );
}
