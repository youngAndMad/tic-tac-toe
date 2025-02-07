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
import GoBackButton from "../components/GoBackButton";

export default function SettingsPage() {
  const theme = useTheme();
  const [darkMode, setDarkMode] = useState(theme.palette.mode === "dark");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [volume, setVolume] = useState(50);

  const handleSaveSettings = () => {
    alert(
      `Settings Saved!\nTheme: ${darkMode ? "Dark" : "Light"}\nSound: ${
        soundEnabled ? "On" : "Off"
      }\nVolume: ${volume}`
    );
  };

  const handleGoBack = () => {};

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
          {/* Dark Mode Toggle */}
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

          {/* Sound Toggle */}
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

          {/* Volume Slider */}
          <Typography gutterBottom>Volume</Typography>
          <Slider
            value={volume}
            onChange={(_, newValue) => setVolume(newValue as number)}
            min={0}
            max={100}
            step={1}
          />

          {/* Save Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSaveSettings}
          >
            Save Settings
          </Button>
          <GoBackButton />
        </CardContent>
      </Card>
    </Box>
  );
}
