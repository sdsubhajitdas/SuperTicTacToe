import questionMarkLight from "../../assets/question-mark-light.png";
import questionMarkDark from "../../assets/question-mark-dark.png";
import { useState } from "react";

export default function HelpButton() {
  const [buttonHover, setButtonHover] = useState(false);

  return (
    <div className="static flex flex-col items-center justify-center mt-5 mb-3 md:mt-10">
      <button
        className="block w-10 bg-transparent rounded-full aspect-square lg:w-20"
        onMouseEnter={() => setButtonHover(true)}
        onMouseLeave={() => setButtonHover(false)}
      >
        <a href="https://www.youtube.com/shorts/_Na3a1ZrX7c" target="_blank">
          <img
            src={buttonHover ? questionMarkDark : questionMarkLight}
            className="w-full h-full"
            style={{
              background: buttonHover
                ? "radial-gradient(white 50%, transparent 1%)"
                : "radial-gradient(#152E3E 50%, transparent 1%)",
            }}
            alt="ask-question"
          />
        </a>
      </button>
      <p className="mt-1 text-xs leading-tight text-center sm:text-sm md:text-base lg:font-semibold text-app-text">
        What is <br />
        Super TicTacToe
      </p>
    </div>
  );
}
