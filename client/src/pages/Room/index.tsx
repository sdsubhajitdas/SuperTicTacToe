import { useSearchParams } from "react-router-dom";
import RoomInput from "../../components/RoomInput";
import { useContext, useState } from "react";
import Button from "../../components/Button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { GameContext } from "../../context/GameContext";

function Room() {
  const [queryParameters] = useSearchParams();
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const { roomId, setRoomId } = useContext(GameContext);

  const {
    mutate: createRoomMutation,
    isSuccess: createRoomIsSuccess,
    isPending: createRoomIsPending,
  } = useMutation({
    mutationFn: (playerName: string) => {
      return axios.post("/api/room", {
        playerName,
      });
    },
    onSuccess: (data) => {
      setRoomId(data.data.roomId);
      console.log(data.data);
    },
  });

  const {
    mutate: joinRoomMutation,
    isSuccess: joinRoomIsSuccess,
    isPending: joinRoomIsPending,
  } = useMutation({
    mutationFn: (playerName: string) => {
      return axios.post(`/api/room/join/${roomId}`, {
        playerName,
      });
    },
    onSuccess: (data) => {
      setRoomId(data.data.roomId);
      console.log(data.data);
    },
  });

  return (
    <main className="flex flex-col items-center min-h-screen gap-5 pt-12 text-center sm:pt-24 bg-app-bg text-app-text">
      <h1 className="text-4xl font-semibold sm:text-6xl">
        Super Tic Tac Toe
        <br />
        Room
      </h1>

      {/* Room Number */}
      <input
        className="max-w-sm px-8 py-1 text-5xl font-medium text-center rounded bg-app-board-background"
        type="text"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        disabled={queryParameters.get("player") != "2"}
      />

      <div className="flex w-2/3 gap-5">
        <RoomInput
          title="Player 1"
          playerName={player1}
          setPlayerName={setPlayer1}
          disabled={
            queryParameters.get("player") != "1" ||
            createRoomIsSuccess ||
            createRoomIsPending
          }
        />
        <RoomInput
          title="Player 2"
          playerName={player2}
          setPlayerName={setPlayer2}
          disabled={
            queryParameters.get("player") != "2" ||
            joinRoomIsSuccess ||
            joinRoomIsPending
          }
        />
      </div>

      <p className="my-10 text-3xl font-medium">
        Waiting for other player to join game ...
      </p>

      <div className="flex">
        <Button
          onClick={() =>
            queryParameters.get("player") === "1"
              ? createRoomMutation(player1)
              : queryParameters.get("player") === "2"
              ? joinRoomMutation(player2)
              : null
          }
          disabled={false}
        >
          Start Game
        </Button>
      </div>
    </main>
  );
}

export default Room;
