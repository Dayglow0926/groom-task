import { combineReducers } from "redux";
import counter from "./counter";
import todos from "./todos";

const rooReducer = combineReducers({
  todos,
  counter,
});

export default rooReducer;

export type RootState = ReturnType<typeof rooReducer>;
