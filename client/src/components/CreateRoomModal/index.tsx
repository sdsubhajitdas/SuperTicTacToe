import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect } from "react";
import Spinner from "../Spinner";
import { GameContext } from "../../context/GameContext";
import { Navigate } from "react-router-dom";

type CreateRoomModalProps = {
  isClosed: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  playerName: string;
  setPlayerName: (arg0: string) => void;
  playerNameError: string;
  setPlayerNameError: (arg0: string) => void;
  roomId: string;
  setRoomId: (arg0: string) => void;
  roomIdError: string;
};

export default function CreateRoomModal({
  isClosed,
  onClose,
  playerName,
  setPlayerName,
  playerNameError,
  setPlayerNameError,
  roomId,
  setRoomId,
  roomIdError,
}: CreateRoomModalProps) {
  const { setRoomId: setGameContextRoomId } = useContext(GameContext);

  const { mutate, isSuccess, isPending } = useMutation({
    mutationFn: () => {
      return axios.post(`/api/room/join/${roomId}`, {
        playerName,
      });
    },
    onSuccess: (data) => {
      setGameContextRoomId(data.data.roomId);
    },
  });

  useEffect(
    function allocateRoomId() {
      async function generateRoomId() {
        const data = await axios.post("/api/room");
        setRoomId(data.data.roomId);
      }

      if (!isClosed && !roomId) {
        generateRoomId();
      }
    },
    [isClosed, roomId, setRoomId]
  );

  function onJoinRoom() {
    if (!playerName) {
      setPlayerNameError("Player name is required");
      return;
    }
    mutate();
  }

  if (isSuccess) {
    return <Navigate to="/game" />;
  }

  return (
    <div className="fixed inset-0 z-10 overflow-y-auto" hidden={isClosed}>
      <div className="flex items-center justify-center min-h-screen p-2">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-20 flex flex-col w-full pb-2 my-10 rounded shadow-lg lg:w-1/3 bg-app-bg text-app-text">
          <span
            className="absolute right-0 px-2.5 py-1 mt-1 mr-1 text-xl sm:text-3xl font-bold leading-none rounded-full  hover:bg-app-bg-light cursor-pointer"
            onClick={() => onClose(true)}
          >
            X
          </span>
          <div className="px-5 pt-3 text-2xl font-medium text-center sm:pt-6 sm:text-4xl">
            Create Room
          </div>
          <div className="flex flex-col gap-2 px-3 py-1 mt-3 sm:flex-row">
            <div className="flex flex-col sm:w-1/4">
              <label htmlFor="roomId" className="pl-1">
                Room
              </label>
              {!roomId && <Spinner className="mx-auto" />}
              {roomId && (
                <input
                  name="roomId"
                  id="roomId"
                  type="text"
                  className="px-2 py-1 text-4xl text-center rounded"
                  disabled
                  value={roomId}
                />
              )}

              <span
                className="mt-1 text-center text-red-700"
                hidden={roomIdError == ""}
              >
                {roomIdError}
              </span>
            </div>
            <div className="flex flex-col sm:w-3/4">
              <label htmlFor="playerName" className="pl-1">
                Player Name
              </label>
              <input
                name="playerName"
                id="playerName"
                type="text"
                className="px-2 py-1 text-4xl text-center rounded"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
              <span
                className="mt-1 text-center text-red-700"
                hidden={playerNameError == ""}
              >
                {playerNameError}
              </span>
            </div>
          </div>
          <button
            className="flex py-2 m-3 text-xl font-medium rounded shadow-xl bg-app-bg-light enabled:hover:bg-app-text enabled:hover:text-white enabled:hover:shadow-app-text/50 lg:text-2xl"
            onClick={onJoinRoom}
            disabled={isPending || isSuccess}
          >
            {isPending ? (
              <Spinner className="mx-auto" />
            ) : (
              <span className="mx-auto">Join Room</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
