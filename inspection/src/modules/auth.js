import { createAction, handleActions } from "redux-actions";
import { takeLatest, call, put, delay } from "redux-saga/effects";
import { startLoading, endLoading } from "./loading"
import { DELAY_TIME } from "../utils/sagaUtil";
import { loginApi, validateTokenApi } from "../api/authApi";

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

export const VALIDATE_TOKEN_REQUEST = "login/VALIDATE_TOKEN_REQUEST";
const VALIDATE_TOKEN_SUCCESS = "login/VALIDATE_TOKEN_SUCCESS";
const VALIDATE_TOKEN_FAILURE = "login/VALIDATE_TOKEN_FAILURE";

export const validateTokenRequest = createAction(VALIDATE_TOKEN_REQUEST);
const validateTokenSuccess = createAction(VALIDATE_TOKEN_SUCCESS, response => ({
  success: response.success,
  username: response.data.username
}));
const validateTokenFailure = createAction(VALIDATE_TOKEN_FAILURE, error => error);

function* validateTokenSaga(action) {

  yield put(startLoading(VALIDATE_TOKEN_REQUEST));
  try{
    //yield delay(DELAY_TIME);
    const response = yield call(validateTokenApi, action.payload);
    yield put(validateTokenSuccess(response));
  }catch(e){
    yield put(validateTokenFailure(e));
  }finally{
    yield put(endLoading(VALIDATE_TOKEN_REQUEST))
  }
}


export function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(VALIDATE_TOKEN_REQUEST, validateTokenSaga);
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
    isLoggedIn: action.payload.success
  }),
  [LOGIN_REQUEST_FAILURE]: (state, action) => ({
    ...state,
    isLoggedIn: false,
    username: null,
    error: action.payload
  }),

  [VALIDATE_TOKEN_SUCCESS]: (state, action) => ({
    ...state,
    username: action.payload.username,
    isLoggedIn: action.payload.success
  }),
  [VALIDATE_TOKEN_FAILURE]: (state, action) => ({
    ...state,
    isLoggedIn: false,
    username: null,
    error: action.payload
  }),
}, initialState)

export default auth;