import BoardButton from "../BoardButton";

type SingleBoardProps = {
  masterBoardIndex: number;
  boardData: Array<"X" | "O" | null>;
  masterData: "X" | "O" | null;
  disable: boolean;
  sendMoveInfo: (masterBoardIndex: number, childBoardIndex: number) => void;
  lastMove: number | null;
};

function SingleBoard({
  masterBoardIndex,
  boardData,
  masterData,
  disable = false,
  sendMoveInfo,
  lastMove,
}: SingleBoardProps) {
  const row = Math.floor(masterBoardIndex / 3);
  const col = masterBoardIndex % 3;

  let borderClassName: string = "";
  if ((row == 0 || row == 1) && (col == 0 || col == 1)) {
    borderClassName = "border-r-4 border-b-4 sm:border-r-8 sm:border-b-8";
  } else if ((row == 0 || row == 1) && col == 2) {
    borderClassName = "border-b-4 sm:border-b-8";
  } else if (row == 2 && (col == 0 || col == 1)) {
    borderClassName = "border-r-4 sm:border-r-8";
  }

  if (masterData) {
    let roundedClassName: string = "";

    if (row == 0 && col == 0) {
      roundedClassName = "rounded-tl-md";
    } else if (row == 2 && col == 0) {
      roundedClassName = "rounded-bl-md";
    } else if (row == 0 && col == 2) {
      roundedClassName = "rounded-tr-md";
    } else if (row == 2 && col == 2) {
      roundedClassName = "rounded-br-md";
    }

    return (
      <div
        className={`h-full w-full flex items-center justify-center  ${borderClassName} ${roundedClassName} bg-app-bg`}
      >
        <span className="text-5xl font-medium cursor-default sm:text-9xl">
          {masterData}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-3 grid-rows-3 font-medium text-app-text ${borderClassName}`}
    >
      {[...Array(9).keys()].map((i) => (
        <BoardButton
          key={i}
          childBoardIndex={i}
          masterBoardIndex={masterBoardIndex}
          disable={boardData[i] ? true : false || disable}
          value={boardData[i]}
          sendMoveInfo={sendMoveInfo}
          lastPlayed={lastMove === i}
        />
      ))}
    </div>
  );
}

export default SingleBoard;
