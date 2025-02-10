import { ThemeProvider } from "@mui/material";
import axios from "axios";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { UserProvider } from "./hooks/useUser";
import theme from "./lib/theme";
import LocalGame from "./pages/LocalGame";
import MenuPage from "./pages/MenuPage";
import OnlineGame from "./pages/OnlineGame";
import PlayOnline from "./pages/PlayOnline";
import ProfilePage from "./pages/Profile";
import SettingsPage from "./pages/Settings";
import { LocalMusicProvider } from "./providers/LocalMusicProvider";
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
            <LocalMusicProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<MenuPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/local-game" element={<LocalGame />} />
                  <Route path="/game" element={<PlayOnline />} />
                  <Route path="/online-game" element={<OnlineGame />} />
                </Routes>
              </Router>
            </LocalMusicProvider>
          </WebSocketProvider>
        </UserProvider>
      </ThemeProvider>
    </div>
  );
}
