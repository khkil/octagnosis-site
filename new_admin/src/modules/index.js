import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loading from './loading';
import { all, call } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import inspection, { inspectionSaga } from './inspection';
import member, { memberSaga } from './member';

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
});

//root saga
export function* rootSaga() {
  yield all([authSaga(), memberSaga(), inspectionSaga()]);
}

export default persistReducer(persistConfig, rootReducer);
