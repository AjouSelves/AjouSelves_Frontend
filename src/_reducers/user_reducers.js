import {
  LOGIN_USER,
  REGISTER_USER,
  GET_USER_INFO,
  DELETE_USER,
  EDIT_USER_INFO,
} from "../_actions/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };

    case REGISTER_USER:
      return { ...state, register: action.payload };

    case GET_USER_INFO:
      return { ...state, getInfo: action.payload };

    case DELETE_USER:
      return { ...state, deleteUser: action.payload };

    case EDIT_USER_INFO:
      return { ...state, editInfo: action.payload };

    default:
      return state;
  }
}
