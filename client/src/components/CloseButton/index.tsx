import closeLogo from "../../assets/close.svg";
import { Link } from "react-router-dom";

export default function CloseButton() {
  return (
    <button className="static rounded-full shadow-xl bottom-3 lg:bottom-10 lg:left-3/4 md:bottom-5 md:right-5 md:absolute lg:w-20 md:w-16 w-14 aspect-square shadow-black/50 bg-app-text hover:bg-app-text/65">
      <Link to="/">
        <img src={closeLogo} className="p-3 invert" alt="Close" />
      </Link>
    </button>
  );
}
