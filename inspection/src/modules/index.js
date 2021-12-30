import { combineReducers } from "redux"
import { all } from "redux-saga/effects"
import loading from "./loading"
import inspection, { inspectionSaga,  } from "./inspection"
import auth, { authSaga } from "./auth";
import question, { questionSaga } from "./question";

const rootReducer = combineReducers({
  loading,
  inspection,
  auth,
  question
  
});

export function* rootSaga() {
  yield all([
    inspectionSaga(),
    authSaga(),
    questionSaga()
  ])
}

export default rootReducer;
