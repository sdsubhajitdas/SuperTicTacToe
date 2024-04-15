import BoardButton from "../BoardButton/index.js";

type SingleBoardProps = {
  index: number;
  disabled?: boolean;
};

function SingleBoard({ index, disabled = false }: SingleBoardProps) {
  const row = Math.floor(index / 3);
  const col = index % 3;

  let borderClassName: string = "";
  if ((row == 0 || row == 1) && (col == 0 || col == 1)) {
    borderClassName = "border-r-8 border-b-8";
  } else if ((row == 0 || row == 1) && col == 2) {
    borderClassName = "border-b-8";
  } else if (row == 2 && (col == 0 || col == 1)) {
    borderClassName = "border-r-8";
  }

  if (disabled) {
    return (
      <div
        className={`h-full w-full flex items-center justify-center  ${borderClassName} bg-app-bg`}
      >
        <span className="font-medium cursor-default text-9xl">
          {Math.random() > 0.5 ? "X" : "O"}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`grid grid-cols-3 grid-rows-3 text-5xl font-medium text-app-text ${borderClassName}`}
    >
      {[...Array(9).keys()].map((i) => (
        <BoardButton
          key={i}
          index={i}
          disabled={Math.random() > 0.5 ? true : false}
        />
      ))}
    </div>
  );
}

export default SingleBoard;
