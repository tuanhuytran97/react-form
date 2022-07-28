import { combineReducers } from "redux";

import counter from "./counter";
import register from "./register";

export const allReducers = combineReducers({
  counter : counter,
  register : register
  // add more reducers here
});