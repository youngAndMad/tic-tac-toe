import React, { createContext, PropsWithChildren } from "react";

export type LocalMusicProps = {
  enabled: boolean;
};

export const LocalMusicContext = createContext<LocalMusicProps | undefined>(
  undefined
);

export const LocalMusicProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const musicEnabled = localStorage.getItem("musicEnabled") === "true";

  return (
    <LocalMusicContext.Provider value={{ enabled: musicEnabled }}>
      {children}
    </LocalMusicContext.Provider>
  );
};
