import GitHubIcon from "@mui/icons-material/GitHub";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export default function MenuPage() {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleGithubLogin = () => {
    navigate("/oauth2/authorization/github");
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
        padding: 3,
      }}
    >
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
