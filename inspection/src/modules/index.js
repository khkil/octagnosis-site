import { combineReducers } from "redux"
import { all } from "redux-saga/effects"
import loading from "./loading"
import inspection, { inspectionSaga,  } from "./inspection"
import auth, { authSaga } from "./auth";
import question, { questionSaga } from "./question";
import member, { memberSaga } from "./member";

const rootReducer = combineReducers({
  loading,
  inspection,
  auth,
  question,
  member
});

export function* rootSaga() {
  yield all([
    inspectionSaga(),
    authSaga(),
    questionSaga(),
    memberSaga()
  ])
}

export default rootReducer;
