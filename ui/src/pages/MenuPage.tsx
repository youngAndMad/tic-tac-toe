import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function MenuPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #42a5f5, #7e57c2)",
        padding: 3,
      }}
    >
      {/* Animated Title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h3" color="white" fontWeight="bold" gutterBottom>
          Tic-Tac-Toe
        </Typography>
      </motion.div>

      {/* Menu Card */}
      <Card sx={{ width: 320, padding: 2, textAlign: "center", boxShadow: 3 }}>
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/game")}
          >
            Play Online
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("/friends")}
          >
            Play with a Friend
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => navigate("/profile")}
          >
            Profile
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/settings")}
          >
            Settings
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
