import { combineReducers } from "redux";
import { cartData } from "./reducer";
import { userReducer } from "./userReducer";

export default combineReducers({
  cartData,
  userReducer,
});
