import { createContext, useState } from "react";
import { useEffect } from "react";
import { io } from "socket.io-client";

type GameContextProviderProps = {
  children: React.ReactNode;
};

export const GameContext = createContext({});

function GameContextProvider({ children }: GameContextProviderProps) {
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    // let socket = io();
  }, []);

  return (
    <GameContext.Provider value={{ roomId, setRoomId }}>
      {children}
    </GameContext.Provider>
  );
}

export default GameContextProvider;
