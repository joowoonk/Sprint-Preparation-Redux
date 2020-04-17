import { combineReducers } from "redux";
import { userReducer as user } from "./userReducer";
// import {postReducer as post} from './postReducer'

export default combineReducers({
  user,
  // post
});
