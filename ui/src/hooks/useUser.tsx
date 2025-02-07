import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { User } from "../models/user.model";
import { userService } from "../service/user.service";

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  reload: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const reloadUser = () => {
    userService.me().then(setUser);
  };

  useEffect(() => {
    reloadUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, reload: reloadUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
