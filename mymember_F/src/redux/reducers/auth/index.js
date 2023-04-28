import { combineReducers } from "redux";
import { login } from "./loginReducer";
import { register } from "./registerReducers";
import { resetPass } from "./restPassReducers";

const authReducers = combineReducers({
  login,
  register,
  resetPass,
});

export default authReducers;
