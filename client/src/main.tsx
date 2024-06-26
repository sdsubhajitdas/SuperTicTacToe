import "./index.css";
import Game from "./pages/Game";
import GameContextProvider from "./context/GameContext";
import Home from "./pages/Home";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/game",
    element: <Game />,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <GameContextProvider>
      <RouterProvider router={router} />
    </GameContextProvider>
  </QueryClientProvider>
);
