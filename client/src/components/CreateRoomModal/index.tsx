type CreateRoomModalProps = {
  isClosed: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function CreateRoomModal({
  isClosed,
  onClose,
}: CreateRoomModalProps) {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto" hidden={isClosed}>
      <div className="flex items-center justify-center min-h-screen p-2">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-20 flex flex-col w-full pb-2 my-10 rounded shadow-lg lg:w-1/3 bg-app-bg text-app-text">
          <span
            className="absolute right-0 px-2.5 py-1 mt-1 mr-1 text-xl sm:text-3xl font-bold leading-none rounded-full  hover:bg-app-bg-light cursor-pointer"
            onClick={() => onClose(true)}
          >
            X
          </span>
          <div className="px-5 pt-3 text-2xl font-medium text-center sm:pt-6 sm:text-4xl">
            Create Room
          </div>
          <div className="flex flex-col gap-2 px-3 py-1 mt-3 sm:flex-row">
            <div className="flex flex-col sm:w-1/4">
              <label htmlFor="roomId" className="pl-1">
                Room Number
              </label>
              <input
                name="roomId"
                id="roomId"
                type="text"
                className="px-2 py-1 text-4xl text-center rounded"
                value="12345"
                disabled
              />
            </div>
            <div className="flex flex-col sm:w-3/4">
              <label htmlFor="playerName" className="pl-1">
                Player Name
              </label>
              <input
                name="playerName"
                id="playerName"
                type="text"
                className="px-2 py-1 text-4xl text-center rounded"
                value="Subhajit"
              />
            </div>
          </div>
          <button className="py-2 m-3 text-xl font-medium rounded shadow-xl bg-app-bg-light hover:bg-app-text hover:text-white hover:shadow-app-text/50 lg:text-2xl">
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}
