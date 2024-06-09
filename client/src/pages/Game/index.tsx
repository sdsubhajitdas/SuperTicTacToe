import io, { Socket } from "socket.io-client";
import { Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import MasterBoard from "../../components/MasterBoard";
import { GameContext } from "../../context/GameContext";
import * as _ from "lodash";
import Cookies from "js-cookie";
import ShareButton from "../../components/ShareButton";
import PlayerTab from "../../components/PlayerTab";
import CloseButton from "../../components/CloseButton";

// Define a type alias for the socket
type MySocket = Socket;

function Game() {
  const { roomId } = useContext(GameContext);
  const [roomData, setRoomData] = useState({});
  const [roomStatus, setRoomStatus] = useState("");
  const [socket, setSocket] = useState<MySocket | null>(null);
  const [allowedToMakeMove, setAllowedToMakeMove] = useState(false);
  const sessionId = Cookies.get("sessionId");

  useEffect(() => {
    if (roomId) {
      const newSocket: MySocket = io();
      setSocket(newSocket);
      newSocket.emit("join-room-initiated", roomId);

      newSocket.on("join-room-completed", (response) => {
        setRoomData(response);
        setRoomStatus(_.get(response, "status", "waiting"));
        setAllowedToMakeMove(_.get(response, "nextMovePlayer") === sessionId);
      });

      newSocket.on("player-made-move-completed", (response) => {
        setAllowedToMakeMove(_.get(response, "nextMovePlayer") === sessionId);
        setRoomStatus(_.get(response, "status", "waiting"));
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

  const displayWinnerText = () => {
    if (_.get(roomData, "winner") === "?") {
      return "It's a tie";
    }

    const winningPlayerIndex = _.findIndex(
      _.get(roomData, "players", []),
      (pl: { sessionId: string }) => pl.sessionId === _.get(roomData, "winner")
    );

    return `Player ${winningPlayerIndex === 0 ? "X" : "O"} ${_.get(
      roomData,
      `players[${winningPlayerIndex}].name`,
      ""
    )} has won`;
  };

  if (!roomId) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="relative flex flex-col items-center min-h-screen gap-5 py-3 sm:py-6 bg-app-bg text-app-text">
      <div className="flex flex-col items-center w-full gap-1 px-2 sm:px-0 sm:w-1/2 md:w-2/3 ">
        <div className="w-full py-2 text-center rounded shadow-2xl bg-app-board-background">
          <span className="block mb-0.5">Room</span>
          <div className="flex items-center justify-between px-4 py-1 mx-2 text-2xl rounded bg-app-bg">
            <span className="flex-grow pl-10 text-center">{roomId}</span>
            {_.get(roomData, "players", []).length < 2 && <ShareButton />}
          </div>
        </div>
        <div className="grid w-full grid-cols-2 grid-rows-1 gap-4 text-xl font-medium text-center sm:text-3xl">
          <PlayerTab
            title="Player X"
            value={_.get(roomData, "players[0].name")}
            active={
              _.get(roomData, "players[0].sessionId") ===
                _.get(roomData, "nextMovePlayer") || roomStatus === "finished"
            }
          />
          <PlayerTab
            title="Player O"
            value={_.get(roomData, "players[1].name")}
            active={
              _.get(roomData, "players[1].sessionId") ===
                _.get(roomData, "nextMovePlayer") || roomStatus === "finished"
            }
          />
        </div>
      </div>

      {roomStatus === "waiting" && (
        <p className="px-2 text-lg font-medium sm:text-2xl sm:px-0">
          "Waiting for other players to join ..."
        </p>
      )}

      {roomStatus === "ready" && (
        <p className="px-2 text-lg font-medium sm:text-2xl sm:px-0">
          {`${_.get(
            _.find(
              _.get(roomData, "players", []),
              (player) =>
                _.get(player, "sessionId") === _.get(roomData, "nextMovePlayer")
            ),
            "name"
          )}'s turn`}
        </p>
      )}

      {roomStatus === "finished" && (
        <p className="px-2 text-lg font-medium sm:text-2xl sm:px-0">
          {displayWinnerText()}
        </p>
      )}

      <MasterBoard
        masterBoardData={_.get(roomData, "masterBoard", Array(9).fill(null))}
        childBoardData={_.get(
          roomData,
          "boards",
          Array(9).fill(Array(9).fill(null))
        )}
        disable={
          _.get(roomData, "status", "waiting") === "waiting" ||
          !allowedToMakeMove ||
          roomStatus === "finished"
        }
        sendMoveInfo={sendMoveInfo}
        allowedBoardToPlay={_.get(roomData, "nextMoveBoard", null)}
      />

      <CloseButton />
    </main>
  );
}

export default Game;
