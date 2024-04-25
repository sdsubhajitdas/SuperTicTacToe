import { createContext, useState } from "react";

type GameContextProviderProps = {
  children: React.ReactNode;
};

export const GameContext = createContext({});

function GameContextProvider({ children }: GameContextProviderProps) {
  const [roomId, setRoomId] = useState("");

  return (
    <GameContext.Provider value={{ roomId, setRoomId }}>
      {children}
    </GameContext.Provider>
  );
}

export default GameContextProvider;
