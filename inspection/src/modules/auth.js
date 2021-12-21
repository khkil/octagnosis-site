import { createAction, handleActions } from "redux-actions";
import { takeLatest, call, put, delay } from "redux-saga/effects";
import { startLoading, endLoading } from "./loading"
import { DELAY_TIME } from "../utils/sagaUtil";
import { loginApi } from "../api/authApi";

export const LOGIN_REQUEST = "login/LOGIN_REQUEST";
const LOGIN_REQUEST_SUCCESS = "login/LOGIN_REQUEST_SUCCESS";
const LOGIN_REQUEST_FAILURE = "login/LOGIN_REQUEST_FAILURE";

export const loginRequest = createAction(LOGIN_REQUEST);
const loginSuccess = createAction(LOGIN_REQUEST_SUCCESS, response => ({
  success: response.success,
  username: response.data.username
}));
const loginFailure = createAction(LOGIN_REQUEST_FAILURE, error => error);

function* loginSaga(action) {

  yield put(startLoading(LOGIN_REQUEST));
  try{
    yield delay(DELAY_TIME);
    const response = yield call(loginApi, action.payload);
    yield put(loginSuccess(response));
  }catch(e){
    yield put(loginFailure(e));
  }finally{
    yield put(endLoading(LOGIN_REQUEST))
  }
}

export function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}

const initialState = {
  isLoggedIn: false,
  username: null,
  error: null
}

const auth = handleActions({
  [LOGIN_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    username: action.payload.username,
    success: action.payload.success
  }),
  [LOGIN_REQUEST_FAILURE]: (state, action) => ({
    ...state,
    isLoggedIn: false,
    username: username,
    error: action.payload
  }),
}, initialState)

export default auth;