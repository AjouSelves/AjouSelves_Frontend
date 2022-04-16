import {
  MODE_ADD,
  MODE_EDIT,
  MODE_GET_ALL,
  MODE_GET_BY_ID,
  MODE_GET_BY_TITLE,
  MODE_REMOVE,
} from "../_actions/types";

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = {}, action) {
  switch (action.type) {
    case MODE_ADD:
      return { ...state, addSuccess: action.payload };

    case MODE_EDIT:
      return { ...state, editSuccess: action.payload };

    case MODE_GET_ALL:
      return { ...state, getAll: action.payload };

    case MODE_GET_BY_ID:
      return { ...state, getById: action.payload };

    case MODE_GET_BY_TITLE:
      return { ...state, getByTitle: action.payload };

    case MODE_REMOVE:
      return { ...state, removeSuccess: action.payload };
    default:
      return state;
  }
}
