import SingleBoard from "../../components/SingleBoard/index.js";

function Game() {
  return (
    <main className="flex flex-col items-center min-h-screen pt-12 sm:pt-24 bg-app-bg text-app-text">
      <div className="grid grid-cols-3 grid-rows-3 p-5 rounded-lg shadow-2xl bg-app-board-background">
        {[...Array(9).keys()].map((i) => (
          <SingleBoard
            key={i}
            index={i}
            disabled={Math.random() > 0.5 ? true : false}
          />
        ))}
      </div>
    </main>
  );
}

export default Game;
