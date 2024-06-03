type BoardButtonProps = {
  childBoardIndex: number;
  masterBoardIndex: number;
  disable?: boolean;
  value: "X" | "O" | null;
  sendMoveInfo: (masterBoardIndex: number, childBoardIndex: number) => void;
};

function BoardButton({
  childBoardIndex,
  masterBoardIndex,
  disable = false,
  value,
  sendMoveInfo,
}: BoardButtonProps) {
  const row = Math.floor(childBoardIndex / 3);
  const col = childBoardIndex % 3;

  let borderClassNames: string = "";
  if ((row == 0 || row == 1) && (col == 0 || col == 1)) {
    borderClassNames =
      "border-r-[1px] border-b-[1px] sm:border-r-2 sm:border-b-2";
  } else if ((row == 0 || row == 1) && col == 2) {
    borderClassNames = "border-b-[1px] sm:border-b-2";
  } else if (row == 2 && (col == 0 || col == 1)) {
    borderClassNames = "border-r-[1px] sm:border-r-2";
  }

  return (
    <button
      className={`aspect-square text-center text-xl sm:text-3xl lg:text-5xl border-white ${borderClassNames} disabled:bg-app-bg hover:bg-app-bg-light`}
      disabled={disable}
      onClick={() => sendMoveInfo(masterBoardIndex, childBoardIndex)}
    >
      {value}
    </button>
  );
}

export default BoardButton;
