import * as _ from "lodash";

export default function sessionIdGenerator(length: number = 32) {
  let chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz01234567890123456789";
  let id = "";
  while (length > 0) {
    const randomIndex = Math.min(
      chars.length - 1,
      Math.max(0, Math.floor(Math.random() * chars.length))
    );
    id = id + chars[randomIndex];
    length--;
  }
  return id;
}

export function decideMoveBasedOnSessionId(
  sessionId: string,
  players: { sessionId: string; name: string }[]
) {
  const index = _.findIndex(
    players,
    (player) => player.sessionId === sessionId
  );

  return index === 0 ? "X" : index === 1 ? "O" : null;
}
