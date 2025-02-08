import { useEffect } from "react";
import { useUser } from "../hooks/useUser";
import { useWebSocket } from "../hooks/useWebSocket";
import UserList from "./UserList";

export default function PlayOnline() {
  const { subscribe, sendMessage } = useWebSocket();
  const { user } = useUser();
  useEffect(() => {
    console.log(`Subscribing to /user/${user?.id}/game`);
    subscribe(`/user/${user?.id}/game`, (message) => {
      console.log("Received message", message);
    });
  }, [subscribe]);

  return <UserList />;
}
