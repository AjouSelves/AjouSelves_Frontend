import {
  PROJ_ADD,
  PROJ_ADD_PHOTO,
  PROJ_EDIT,
  PROJ_EDIT_PHOTO,
  PROJ_DELETE,
  PROJ_GET_ALL,
  PROJ_GET_BY_ID,
  PROJ_JOIN,
  PROJ_LEAVE,
} from "../_actions/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {
  switch (action.type) {
    case PROJ_ADD:
      return { ...state, addSuccess: action.payload };

    case PROJ_ADD_PHOTO:
      return { ...state, addSuccess: action.payload };

    // case PROJ_ADD_MULTI:
    //   return { ...state, addSuccess: action.payload };

    case PROJ_EDIT:
      return { ...state, editSuccess: action.payload };

    case PROJ_EDIT_PHOTO:
      return { ...state, editSuccess: action.payload };

    case PROJ_DELETE:
      return { ...state, deleteSuccess: action.payload };

    case PROJ_GET_ALL:
      return { ...state, getAll: action.payload };

    case PROJ_GET_BY_ID:
      return { ...state, getById: action.payload };

    case PROJ_JOIN:
      return { ...state, joinSuccess: action.payload };

    case PROJ_LEAVE:
      return { ...state, leaveSuccess: action.payload };
    default:
      return state;
  }
}
