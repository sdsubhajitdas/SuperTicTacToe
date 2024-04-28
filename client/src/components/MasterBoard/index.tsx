import SingleBoard from "../../components/SingleBoard/index.js";

type MasterBoardProps = {
  masterBoardData: Array<"X" | "O" | null>;
  childBoardData: Array<Array<"X" | "O" | null>>;
  disable: boolean;
  sendMoveInfo: (masterBoardIndex: number, childBoardIndex: number) => void;
};

export default function MasterBoard({
  masterBoardData,
  childBoardData,
  disable = false,
  sendMoveInfo,
}: MasterBoardProps) {
  return (
    <div className="grid grid-cols-3 grid-rows-3 p-1.5 md:p-2 lg:p-5 mx-1.5 rounded-lg shadow-2xl bg-app-board-background lg:mx-0">
      {[...Array(9).keys()].map((i) => (
        <SingleBoard
          key={i}
          masterBoardIndex={i}
          boardData={childBoardData[i]}
          masterData={masterBoardData[i]}
          disable={disable}
          sendMoveInfo={sendMoveInfo}
        />
      ))}
    </div>
  );
}
