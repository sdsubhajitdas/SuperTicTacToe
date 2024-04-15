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
    borderClassNames = "border-r-2 border-b-2";
  } else if ((row == 0 || row == 1) && col == 2) {
    borderClassNames = "border-b-2";
  } else if (row == 2 && (col == 0 || col == 1)) {
    borderClassNames = "border-r-2";
  }

  return (
    <button
      className={`w-20 h-20 text-center  border-white ${borderClassNames} disabled:bg-app-bg hover:bg-app-bg-light`}
      disabled={disabled}
    >
      {disabled ? value : ""}
    </button>
  );
}

export default BoardButton;
