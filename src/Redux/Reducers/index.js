import { combineReducers } from "redux";
import { jokesReducer } from "./jokesReducer";

const reducers = combineReducers({
  allJokes: jokesReducer,
});
export default reducers;
