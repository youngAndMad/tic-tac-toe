import { ThemeProvider } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { UserProvider } from "./hooks/useUser";
import theme from "./lib/theme";
import MenuPage from "./pages/MenuPage";
import ProfilePage from "./pages/Profile";
import SettingsPage from "./pages/Settings";
import { WebSocketProvider } from "./providers/WebSocketProvider";

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
              </Routes>
            </Router>
          </WebSocketProvider>
        </UserProvider>
      </ThemeProvider>
    </div>
  );
}
