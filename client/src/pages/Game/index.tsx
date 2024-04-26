import { useContext } from "react";
import { GameContext } from "../../context/GameContext/index.js";
import { Navigate } from "react-router-dom";
import MasterBoard from "../../components/MasterBoard/index.js";

function Game() {
  const { roomId } = useContext(GameContext);

  if (!roomId) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="flex flex-col items-center min-h-screen gap-5 py-3 sm:py-6 bg-app-bg text-app-text">
      <div className="flex flex-col items-center w-full gap-1 px-2 sm:px-0 sm:w-1/2 md:w-2/3 ">
        <p className="w-full py-1 text-center rounded shadow-2xl bg-app-board-background">
          Room
          <span className="block py-1 mx-2 text-2xl rounded bg-app-bg">
            {roomId}
          </span>
        </p>
        <div className="grid w-full grid-cols-2 grid-rows-1 gap-4 text-xl font-medium text-center sm:text-3xl">
          <p className="py-1 rounded shadow-2xl bg-app-board-background">
            Player X
            <span className="block pt-2 pb-1 mx-2 text-lg rounded sm:text-2xl bg-app-bg">
              Subhajit
            </span>
          </p>
          <p className="py-2 rounded shadow-2xl bg-app-board-background">
            Player O
            <span className="block pt-2 pb-1 mx-2 text-lg rounded sm:text-2xl bg-app-bg">
              Jeetu
            </span>
          </p>
        </div>
      </div>

      <p className="px-2 text-lg font-medium sm:text-2xl sm:px-0">
        Waiting for other players to join ...
      </p>

      <MasterBoard />
    </main>
  );
}

export default Game;
