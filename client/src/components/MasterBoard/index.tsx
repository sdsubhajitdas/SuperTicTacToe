import SingleBoard from "../../components/SingleBoard";

type MasterBoardProps = {
  masterBoardData: Array<"X" | "O" | null>;
  childBoardData: Array<Array<"X" | "O" | null>>;
  disable: boolean;
  sendMoveInfo: (masterBoardIndex: number, childBoardIndex: number) => void;
  allowedBoardToPlay: null | number;
  lastMove: { masterBoardIndex: number; childBoardIndex: number } | null;
};

export default function MasterBoard({
  masterBoardData,
  childBoardData,
  disable = false,
  sendMoveInfo,
  allowedBoardToPlay,
  lastMove,
}: MasterBoardProps) {
  return (
    <div className="relative grid grid-cols-3 grid-rows-3 p-1.5 md:p-2 lg:p-5 rounded-lg shadow-2xl bg-app-board-background aspect-square 2xl:w-1/3 xl:w-3/5 lg:w-1/2 md:w-2/3 w-11/12">
      {[...Array(9).keys()].map((i) => (
        <SingleBoard
          key={i}
          masterBoardIndex={i}
          boardData={childBoardData[i]}
          masterData={masterBoardData[i]}
          disable={
            disable || (allowedBoardToPlay !== null && allowedBoardToPlay !== i)
          }
          sendMoveInfo={sendMoveInfo}
          lastMove={
            lastMove && lastMove.masterBoardIndex === i
              ? lastMove.childBoardIndex
              : null
          }
        />
      ))}
      <div
        className="absolute top-0 bottom-0 left-0 right-0 bg-app-bg/40"
        hidden={!disable}
      ></div>
    </div>
  );
}
