import { Dispatch } from "react";

type RoomInputProps = {
  title: string;
  disabled: boolean;
  playerName: string;
  setPlayerName: Dispatch<string>;
};

function RoomInput({
  title,
  disabled,
  playerName,
  setPlayerName,
}: RoomInputProps) {
  return (
    <div className="flex flex-col gap-5 p-4 rounded shadow-lg bg-app-board-background grow shadow-app-text/50">
      <label htmlFor="player1" className="text-4xl font-medium">
        {title}
      </label>
      <input
        name="player1"
        id="player1"
        type="text"
        className="p-3 text-4xl rounded"
        value={playerName}
        disabled={disabled}
        onChange={(e) => setPlayerName(e.target.value)}
      />
    </div>
  );
}

export default RoomInput;
