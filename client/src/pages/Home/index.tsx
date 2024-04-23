import { useState } from "react";
import logo from "../../assets/logo.png";
import Button from "../../components/Button";
import CreateRoomModal from "../../components/CreateRoomModal";
import JoinRoomModal from "../../components/JoinRoomModal";
import useRoomManagement, {
  roomManagementActions,
} from "../../hooks/useRoomManagement";

function Home() {
  const [createRoomIsClosed, setCreateRoomIsClosed] = useState(true);
  const [joinRoomIsClosed, setJoinRoomIsClosed] = useState(true);
  const [state, dispatch] = useRoomManagement();

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
        <Button onClick={() => setCreateRoomIsClosed(false)}>
          Create Room
        </Button>
        <Button onClick={() => setJoinRoomIsClosed(false)}>Join Room</Button>
      </div>
      <CreateRoomModal
        isClosed={createRoomIsClosed}
        onClose={setCreateRoomIsClosed}
        playerName={state.player1.value}
        setPlayerName={(playerName: string) =>
          dispatch({
            type: roomManagementActions.SET_PLAYER_1_NAME,
            payload: playerName,
          })
        }
        roomId={state.room.value}
      />
      <JoinRoomModal
        isClosed={joinRoomIsClosed}
        onClose={setJoinRoomIsClosed}
        playerName={state.player2.value}
        setPlayerName={(playerName: string) =>
          dispatch({
            type: roomManagementActions.SET_PLAYER_2_NAME,
            payload: playerName,
          })
        }
        roomId={state.room.value}
        setRoomId={(roomId: string) =>
          dispatch({
            type: roomManagementActions.SET_ROOM_VALUE,
            payload: roomId,
          })
        }
      />
    </main>
  );
}

export default Home;
