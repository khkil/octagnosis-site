import { combineReducers } from "redux"
import { all } from "redux-saga/effects"
import loading from "./loading"
import inspection, { inspectionSaga,  } from "./inspection"
import auth, { authSaga } from "./auth";

const rootReducer = combineReducers({
  loading,
  inspection,
  auth
});

export function* rootSaga() {
  yield all([
    inspectionSaga(),
    authSaga()
  ])
}

export default rootReducer;
