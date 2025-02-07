import {
  Box,
  Button,
  Card,
  CardContent,
  Slider,
  Switch,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { motion } from "framer-motion";
import { useState } from "react";
import Howler from "react-howler";

const musicTracks = [
  "/music/track1.mp3",
  "/music/track2.mp3",
  "/music/track3.mp3",
];

export default function SettingsPage() {
  const theme = useTheme();
  const [darkMode, setDarkMode] = useState(theme.palette.mode === "dark");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [volume, setVolume] = useState(50);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const changeMusic = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % musicTracks.length);
  };

  const handleSaveSettings = () => {
    alert(
      `Settings Saved!\nTheme: ${darkMode ? "Dark" : "Light"}\nSound: ${
        soundEnabled ? "On" : "Off"
      }\nVolume: ${volume}`
    );
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: darkMode ? "#121212" : "#f5f5f5",
        padding: 3,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          color={darkMode ? "white" : "black"}
        >
          Settings
        </Typography>
      </motion.div>

      <Card sx={{ width: 340, padding: 3, textAlign: "center", boxShadow: 3 }}>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography>Dark Mode</Typography>
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
          </Box>

          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography>Sound</Typography>
            <Switch
              checked={soundEnabled}
              onChange={() => setSoundEnabled(!soundEnabled)}
            />
          </Box>

          <Typography gutterBottom>Volume</Typography>
          <Slider
            value={volume}
            onChange={(_, newValue) => setVolume(newValue as number)}
            min={0}
            max={100}
            step={1}
          />

          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={changeMusic}
          >
            Change Background Music 🎵
          </Button>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSaveSettings}
          >
            Save Settings
          </Button>

          <Howler
            src={musicTracks[currentTrackIndex]}
            playing={soundEnabled}
            loop={true}
            volume={volume / 100}
          />
        </CardContent>
      </Card>
    </Box>
  );
}
