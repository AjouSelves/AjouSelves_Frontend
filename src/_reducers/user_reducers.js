import {
  LOGIN_USER,
  REGISTER_USER,
  GET_USER_INFO,
  DELETE_USER,
  EDIT_USER_INFO,
  GET_JOIN_TITLE,
  PASSWORD_VERIFY,
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

    case GET_JOIN_TITLE:
      return { ...state, getJoinTitle: action.payload };

    case PASSWORD_VERIFY:
      return { ...state, passVeri: action.payload };

    default:
      return state;
  }
}
