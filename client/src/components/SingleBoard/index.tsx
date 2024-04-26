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
    borderClassName = "border-r-4 border-b-4 sm:border-r-8 sm:border-b-8";
  } else if ((row == 0 || row == 1) && col == 2) {
    borderClassName = "border-b-4 sm:border-b-8";
  } else if (row == 2 && (col == 0 || col == 1)) {
    borderClassName = "border-r-4 sm:border-r-8";
  }

  if (disabled) {
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
          {Math.random() > 0.5 ? "X" : "O"}
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
          index={i}
          disabled={Math.random() > 0.5 ? true : false}
        />
      ))}
    </div>
  );
}

export default SingleBoard;
