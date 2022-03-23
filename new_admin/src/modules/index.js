import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loading from './loading';
import { all, call } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import inspection, { inspectionSaga } from './inspection';
import question, { questionSaga } from './question';
import member, { memberSaga } from './member';
import progress, { progressSaga } from './progress';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

const rootReducer = combineReducers({
  loading,
  auth,
  inspection,
  member,
  question,
  progress,
});

//root saga
export function* rootSaga() {
  yield all([authSaga(), memberSaga(), inspectionSaga(), questionSaga(), progressSaga()]);
}

export default persistReducer(persistConfig, rootReducer);
