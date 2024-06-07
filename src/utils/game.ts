import * as _ from "lodash";

export function checkTicTacToeBoard(board: ("X" | "O" | null)[]) {
  const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Top-left to bottom-right diagonal
    [2, 4, 6], // Top-right to bottom-left diagonal
  ];

  // Check for a winner
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; // Return the winner ('X' or 'O')
    }
  }

  // Check if the game is still ongoing
  if (board.includes(null)) {
    return null;
  }

  // If no winner and no null values, it's a draw
  return "?";
}

export function decideNextMovePlayer(
  lastMovePlayer: string,
  players: { sessionId: string | null; name: string }[]
) {
  if (!lastMovePlayer) {
    return players[0].sessionId;
  }
  const lastMovePlayerIndex = _.findIndex(players, player => player.sessionId === lastMovePlayer)
  return lastMovePlayerIndex === 0 ? players[1].sessionId : players[0].sessionId;
}

export function decideNextMoveBoard(childBoardIndex: number, masterBoard: ("X" | "Y" | "?" | null)[]) {
  // If the next chosen board is full then play in all boards
  if (masterBoard[childBoardIndex] !== null)
    return childBoardIndex;
  return null;
}