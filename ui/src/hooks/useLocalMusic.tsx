import { useContext } from "react";
import { LocalMusicContext } from "../providers/LocalMusicProvider";

export const useLocalMucic = () => {
  const context = useContext(LocalMusicContext);
  if (!context) {
    throw new Error("useLocalMusic must be used within a LocalMusicProvider");
  }
  return context;
};
