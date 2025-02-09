import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import SockJS from "sockjs-client";
import Stomp, { Client, Message } from "stompjs";
import { useUser } from "../hooks/useUser";

type Subscription = {
  topic: string;
  callback: (message: Message) => void;
};

type WebSocketContextProps = {
  subscribe: (topic: string, callback: (message: Message) => void) => void;
  unsubscribe: (topic: string) => void;
  sendMessage: (destination: string, body: string) => void;
  connected: boolean;
};

const WebSocketContext = createContext<WebSocketContextProps | undefined>(
  undefined
);

export const WebSocketProvider: FC<PropsWithChildren> = ({ children }) => {
  const [client, setClient] = useState<Client | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [connected, setConnected] = useState(false);

  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      console.log("User is not logged in");
      return;
    }
    const socket = new SockJS("/ws");
    const stompClient = Stomp.over(socket);

    stompClient.connect(
      {},
      () => {
        console.log("Connected to WebSocket");
        setConnected(true);

        subscriptions.forEach(({ topic, callback }) => {
          stompClient.subscribe(topic, (message) => callback(message));
        });
      },
      (error) => {
        console.error("WebSocket connection error:", error);
      }
    );

    setClient(stompClient);

    return () => {
      if (stompClient.connected) {
        stompClient.disconnect(() => {
          console.log("Disconnected from WebSocket");
          setConnected(false);
        });
      }
    };
  }, [user]);

  const subscribe = useCallback(
    (topic: string, callback: (message: Message) => void) => {
      if (
        client?.connected &&
        user &&
        subscriptions.every((sub) => sub.topic !== topic)
      ) {
        console.log("Subscribing to", topic);
        client.subscribe(topic, (message) => callback(message));
        setSubscriptions((prev) => [...prev, { topic, callback }]);
      } else {
        console.error("Client is not connected. Cannot subscribe to", topic);
      }
    },
    [client, user]
  );

  const unsubscribe = useCallback(
    (topic: string) => {
      setSubscriptions((prev) => prev.filter((sub) => sub.topic !== topic));
      if (client?.connected) {
        client.unsubscribe(topic);
      } else {
        console.error(
          "Client is not connected. Cannot unsubscribe from",
          topic
        );
      }
    },
    [client]
  );

  const sendMessage = useCallback(
    (destination: string, body: string) => {
      if (client?.connected) {
        client.send(destination, {}, body);
      } else {
        console.error(
          "WebSocket client is not connected. Cannot send message to",
          destination
        );
      }
    },
    [client]
  );

  return (
    <WebSocketContext.Provider
      value={{
        connected,
        subscribe,
        unsubscribe,
        sendMessage,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export default WebSocketContext;
