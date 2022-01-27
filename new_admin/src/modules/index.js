import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import loading from "./loading";
import { all, call } from "redux-saga/effects";
import auth, { authSaga } from "./auth";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"]
};

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

export default persistReducer(persistConfig, rootReducer);
