import {
  createContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// Define the type for the context value
type GameContextType = {
  roomId: string;
  setRoomId: Dispatch<SetStateAction<string>>;
};

// Create a default value for the context
const defaultContextValue: GameContextType = {
  roomId: "",
  setRoomId: () => {}, // Provide a no-op function as a default
};

type GameContextProviderProps = {
  children: ReactNode;
};

export const GameContext = createContext<GameContextType>(defaultContextValue);

export default function GameContextProvider({
  children,
}: GameContextProviderProps) {
  const [roomId, setRoomId] = useState("");

  return (
    <GameContext.Provider value={{ roomId, setRoomId }}>
      {children}
    </GameContext.Provider>
  );
}
