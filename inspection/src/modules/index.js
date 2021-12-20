import { combineReducers } from "redux"
import { all } from "redux-saga/effects"
import loading from "./loading"
import inspection, { inspectionSaga } from "./inspection"

const rootReducer = combineReducers({
  loading,
  inspection
});

export function* rootSaga() {
  yield all([
    inspectionSaga()
  ])
}

export default rootReducer;
