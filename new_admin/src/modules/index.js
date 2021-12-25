import { combineReducers } from "redux";
import loading from "./loading";
import { all, call } from "redux-saga/effects";
import auth, { authSaga } from "./auth";
//root reducer
const rootReducer = combineReducers({
  loading,
  auth
});

//root saga
export function* rootSaga() {
  yield all([
    authSaga()
  ]);
}

export default rootReducer;
