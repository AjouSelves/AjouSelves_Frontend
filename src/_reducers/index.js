import { combineReducers } from "redux";
import board from "./board_reducer";
import user from "./user_reducers";
import goods from "./goods_reducers";

const rootReducer = combineReducers({
  board,
  user,
  goods,
});

export default rootReducer;
