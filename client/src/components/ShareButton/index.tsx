import { useContext } from "react";
import shareLogo from "../../assets/share.svg";
import { GameContext } from "../../context/GameContext";

type ShareButtonProps = {
  showToast: (message: string, type: "success" | "error") => void;
};

function ShareButton({ showToast }: ShareButtonProps) {
  const { roomId } = useContext(GameContext);

  async function copyToClipBoard(link: string) {
    try {
      const message = `Join me in Super Tic Tac Toe Arena !\nClick here to play: ${link}`;
      await navigator.clipboard.writeText(message);
      showToast("Copied to clipboard", "success");
    } catch (error) {
      console.error(error);
      showToast(error as string, "error");
    }
  }

  return (
    <button
      className="px-1 py-1 mr-0 rounded sm:mr-1 hover:bg-app-board-background"
      onClick={() => copyToClipBoard(`${window.location.host}/?join=${roomId}`)}
      title="Share"
    >
      <img src={shareLogo} className="w-6 h-6" alt="Share" />
    </button>
  );
}

export default ShareButton;
