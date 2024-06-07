import { useContext } from "react";
import shareLogo from "../../assets/share.svg";
import { GameContext } from "../../context/GameContext";

function ShareButton() {
  const { roomId } = useContext(GameContext);

  async function copyToClipBoard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button
      className="px-1 py-1 mr-0 rounded sm:mr-1 hover:bg-app-board-background"
      onClick={() => copyToClipBoard(`${window.location.host}?join=${roomId}`)}
      title="Share"
    >
      <img src={shareLogo} className="w-6 h-6" alt="Share" />
    </button>
  );
}

export default ShareButton;
