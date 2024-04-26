import SingleBoard from "../../components/SingleBoard/index.js";

export default function MasterBoard() {
  return (
    <div className="grid grid-cols-3 grid-rows-3 p-1.5 md:p-2 lg:p-5 mx-1.5 rounded-lg shadow-2xl bg-app-board-background lg:mx-0">
      {[...Array(9).keys()].map((i) => (
        <SingleBoard
          key={i}
          index={i}
          disabled={Math.random() > 0.5 ? true : false}
        />
      ))}
    </div>
  );
}