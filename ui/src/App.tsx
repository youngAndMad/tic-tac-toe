import { ThemeProvider } from "@mui/material";
import axios from "axios";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { UserProvider } from "./hooks/useUser";
import theme from "./lib/theme";
import LocalGame from "./pages/LocalGame";
import MenuPage from "./pages/MenuPage";
import PlayOnline from "./pages/PlayOnline";
import ProfilePage from "./pages/Profile";
import SettingsPage from "./pages/Settings";
import { WebSocketProvider } from "./providers/WebSocketProvider";

axios.interceptors.response.use((response) => {
  if (response.status === 401) {
    console.log("401 response status ");
    window.location.href = "/oauth2/authorization/github";
  }
  return response;
});

export default function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <UserProvider>
          <WebSocketProvider>
            <Router>
              <Routes>
                <Route path="/" element={<MenuPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/local-game" element={<LocalGame />} />
                <Route path="/game" element={<PlayOnline />} />
              </Routes>
            </Router>
          </WebSocketProvider>
        </UserProvider>
      </ThemeProvider>
    </div>
  );
}
