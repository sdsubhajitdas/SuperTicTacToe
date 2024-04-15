import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import Button from "../../components/Button";

function Home() {
  return (
    <main className="flex flex-col items-center min-h-screen pt-12 sm:pt-24 bg-app-bg text-app-text">
      <span className="font-semibold text-center">
        <h2 className="text-xl sm:text-2xl">Welcome to</h2>
        <h1 className="text-4xl sm:text-6xl">Super Tic Tac Toe</h1>
        <h2 className="text-2xl sm:text-4xl">Arena</h2>
      </span>
      <img
        className="w-2/3 sm:w-1/2 lg:w-1/5 aspect-auto"
        src={logo}
        alt="Game logo"
      />
      <div className="flex flex-col w-3/4 gap-2 mt-10 md:w-1/3 lg:w-1/2 lg:flex-row">
        <Button>
          <Link to="room?player=1">Create Room</Link>
        </Button>
        <Button>
          <Link to="room?player=2">Join Room</Link>
        </Button>
      </div>
    </main>
  );
}

export default Home;
