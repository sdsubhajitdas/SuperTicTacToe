import io from "socket.io-client";
import { Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import MasterBoard from "../../components/MasterBoard/index.js";
import { GameContext } from "../../context/GameContext/index.js";
import * as _ from "lodash";
import { Socket } from "socket.io";
import shareLogo from "../../assets/share.svg";

function Game() {
  const { roomId } = useContext(GameContext);
  const [roomData, setRoomData] = useState({});
  const [socket, setSocket] = useState(undefined as unknown as Socket);

  useEffect(() => {
    if (roomId) {
      const newSocket = io();
      setSocket(newSocket);
      newSocket.emit("join-room-initiated", roomId);

      newSocket.on("join-room-completed", (response) => {
        setRoomData(response);
      });

      newSocket.on("player-made-move-completed", (response) => {
        setRoomData(response);
      });

      // Cleanup function to close the socket connection when component unmounts
      return () => {
        newSocket.disconnect();
      };
    }
  }, []);

  const sendMoveInfo = (masterBoardIndex: number, childBoardIndex: number) => {
    if (socket) {
      socket.emit("player-made-move-initiated", {
        masterBoardIndex,
        childBoardIndex,
        roomId,
      });
    }
  };

  if (!roomId) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="flex flex-col items-center min-h-screen gap-5 py-3 sm:py-6 bg-app-bg text-app-text">
      <div className="flex flex-col items-center w-full gap-1 px-2 sm:px-0 sm:w-1/2 md:w-2/3 ">
        <div className="w-full py-2 text-center rounded shadow-2xl bg-app-board-background">
          <span className="block mb-0.5">Room</span>
          <div className="flex items-center justify-between px-4 py-1 mx-2 text-2xl rounded bg-app-bg">
            <span className="flex-grow pl-10 text-center">{roomId}</span>
            <button
              className="px-1 py-1 mr-0 rounded sm:mr-1 hover:bg-app-board-background"
              title="Share"
            >
              <img src={shareLogo} className="w-6 h-6" alt="Share" />
            </button>
          </div>
        </div>
        <div className="grid w-full grid-cols-2 grid-rows-1 gap-4 text-xl font-medium text-center sm:text-3xl">
          <p className="py-1 rounded shadow-2xl bg-app-board-background">
            Player X
            <span className="block pt-2 pb-1 mx-2 text-lg rounded sm:text-2xl bg-app-bg">
              {_.get(roomData, "players[0].name", " ")}
            </span>
          </p>
          <p className="py-2 rounded shadow-2xl bg-app-board-background">
            Player O
            <span className="block pt-2 pb-1 mx-2 text-lg rounded sm:text-2xl bg-app-bg">
              {_.get(roomData, "players[1].name", " ")}
            </span>
          </p>
        </div>
      </div>

      <p className="px-2 text-lg font-medium sm:text-2xl sm:px-0">
        {_.get(roomData, "status", "waiting") == "waiting" &&
          "Waiting for other players to join ..."}
      </p>

      <MasterBoard
        masterBoardData={_.get(roomData, "masterBoard", Array(9).fill(null))}
        childBoardData={_.get(
          roomData,
          "boards",
          Array(9).fill(Array(9).fill(null))
        )}
        disable={_.get(roomData, "status", "waiting") == "waiting"}
        sendMoveInfo={sendMoveInfo}
      />
    </main>
  );
}

export default Game;
