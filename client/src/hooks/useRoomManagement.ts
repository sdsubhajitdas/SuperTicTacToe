import { useReducer } from "react"


export const roomManagementActions = {
  SET_PLAYER_1_NAME: "set_player_1_name",
  SET_PLAYER_1_ERROR: "set_player_1_error",
  SET_PLAYER_2_NAME: "set_player_2_name",
  SET_PLAYER_2_ERROR: "set_player_2_error",
  SET_ROOM_VALUE: "set_room_value",
  SET_ROOM_ERROR: "set_room_error",
}

function reducer(state: unknown, action: { type: string, payload: unknown }) {
  const newState = JSON.parse(JSON.stringify(state));
  const payload = action.payload;

  switch (action.type) {
    case roomManagementActions.SET_PLAYER_1_NAME:
      newState.player1.value = payload;
      break;
    case roomManagementActions.SET_PLAYER_1_ERROR:
      newState.player1.error = payload;
      break;
    case roomManagementActions.SET_PLAYER_2_NAME:
      newState.player2.value = payload;
      break;
    case roomManagementActions.SET_PLAYER_2_ERROR:
      newState.player2.error = payload;
      break;
    case roomManagementActions.SET_ROOM_VALUE:
      newState.room.value = payload;
      break;
    case roomManagementActions.SET_ROOM_ERROR:
      newState.room.error = payload;
      break;
  }
  return newState;
}

export default function useRoomManagement() {
  const initialState = {
    player1: {
      value: "",
      error: ""
    },
    player2: {
      value: "",
      error: ""
    },
    room: {
      value: "",
      error: ""
    }
  }




  return useReducer(reducer, initialState);
}
