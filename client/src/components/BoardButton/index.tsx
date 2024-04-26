import { useState } from "react";

type BoardButtonProps = {
  index: number;
  disabled?: boolean;
};

function BoardButton({ index, disabled = false }: BoardButtonProps) {
  const [value] = useState(Math.random() > 0.5 ? "X" : "O");

  const row = Math.floor(index / 3);
  const col = index % 3;

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
      className={`w-9 h-9 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-center text-xl sm:text-3xl lg:text-5xl border-white ${borderClassNames} disabled:bg-app-bg hover:bg-app-bg-light`}
      disabled={disabled}
    >
      {disabled ? value : ""}
    </button>
  );
}

export default BoardButton;
