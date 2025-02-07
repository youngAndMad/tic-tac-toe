import GitHubIcon from "@mui/icons-material/GitHub";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { userService } from "../service/user.service";

export default function MenuPage() {
  const navigate = useNavigate();
  const { user } = useUser();

  const [onlineUsersCount, setOnlineUsersCount] = useState<number>(0);

  const handleGithubLogin = () => {
    window.location.href = "/oauth2/authorization/github";
  };

  useEffect(() => {
    userService
      .onlineUsersCount()
      .then((usersCount) => setOnlineUsersCount(usersCount.count + 1));
  }, []);

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
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          background: "rgba(0, 0, 0, 0.7)",
          color: "white",
          padding: "8px 16px",
          borderRadius: "8px",
          fontWeight: "bold",
        }}
      >
        Online Users: {onlineUsersCount}
      </Box>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Typography variant="h3" color="white" fontWeight="bold" gutterBottom>
          Tic-Tac-Toe
        </Typography>
      </motion.div>

      <Card sx={{ width: 320, padding: 2, textAlign: "center", boxShadow: 3 }}>
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {!!user ? (
            <>
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
                onClick={() => navigate("/local-game")}
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
            </>
          ) : (
            <>
              <Button
                variant="contained"
                onClick={handleGithubLogin}
                sx={{
                  padding: "10px 20px",
                  borderRadius: "8px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  textTransform: "none",
                  backgroundColor: "black",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  "&:hover": {
                    backgroundColor: "#333",
                  },
                }}
              >
                <GitHubIcon />
                Sign in using Github
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
