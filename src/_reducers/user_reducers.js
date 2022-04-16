import { LOGIN_USER, REGISTER_USER, GET_ALL_USER } from "../_actions/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };

    case REGISTER_USER:
      return { ...state, register: action.payload };

    case GET_ALL_USER:
      return { ...state, getall: action.payload };

    default:
      return state;
  }
}
