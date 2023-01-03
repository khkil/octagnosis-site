import { combineReducers } from "redux"
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'
import { all } from "redux-saga/effects"
import loading from "./loading"
import inspection, { inspectionSaga,  } from "./inspection"
import auth, { authSaga } from "./auth";
import question, { questionSaga } from "./question";
import member, { memberSaga } from "./member";

const persistConfig = {
  key: "root",
  // localStorage에 저장합니다.
  storage,
  // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
  whitelist: ["auth"]
  // blacklist -> 그것만 제외합니다
};

export function* rootSaga() {
  yield all([
    inspectionSaga(),
    authSaga(),
    questionSaga(),
    memberSaga()
  ])
}

const rootReducer = combineReducers({
  loading,
  inspection,
  auth,
  question,
  member
});

export default persistReducer(persistConfig, rootReducer);
