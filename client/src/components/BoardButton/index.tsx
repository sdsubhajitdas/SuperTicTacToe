type BoardButtonProps = {
  childBoardIndex: number;
  masterBoardIndex: number;
  disable?: boolean;
  value: "X" | "O" | null;
  sendMoveInfo: (masterBoardIndex: number, childBoardIndex: number) => void;
  lastPlayed: boolean | null;
};

function BoardButton({
  childBoardIndex,
  masterBoardIndex,
  disable = false,
  value,
  sendMoveInfo,
  lastPlayed,
}: BoardButtonProps) {
  const row = Math.floor(childBoardIndex / 3);
  const col = childBoardIndex % 3;

  let borderClassNames: string = "";

  if (!lastPlayed) {
    if ((row == 0 || row == 1) && (col == 0 || col == 1)) {
      borderClassNames =
        "border-r-[1px] border-b-[1px] sm:border-r-2 sm:border-b-2";
    } else if ((row == 0 || row == 1) && col == 2) {
      borderClassNames = "border-b-[1px] sm:border-b-2";
    } else if (row == 2 && (col == 0 || col == 1)) {
      borderClassNames = "border-r-[1px] sm:border-r-2";
    }
    borderClassNames += "border-white";
  } else {
    borderClassNames = "border-red-500 sm:border-[3px] border-2";
  }

  return (
    <button
      className={`aspect-square text-center text-xl sm:text-3xl lg:text-5xl ${borderClassNames} disabled:bg-app-bg hover:bg-app-bg-light`}
      disabled={disable}
      onClick={() => sendMoveInfo(masterBoardIndex, childBoardIndex)}
    >
      {value}
    </button>
  );
}

export default BoardButton;
