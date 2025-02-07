import { ThemeProvider } from "@mui/material";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import theme from "./lib/theme";
import MenuPage from "./pages/MenuPage";
import SettingsPage from "./pages/Settings";

export default function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<MenuPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </div>
  );
}
