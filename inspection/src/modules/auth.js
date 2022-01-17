import { createAction, handleActions } from "redux-actions";
import { takeLatest, call, put, delay } from "redux-saga/effects";
import { startLoading, endLoading } from "./loading"
import { DELAY_TIME } from "../utils/sagaUtil";
import { loginApi, logoutApi, signUpApi, validateTokenApi } from "../api/authApi";
import { goLoginPage } from "../utils/common";

/* 회원가입 */
export const SIGN_UP_REQUEST = "auth/SIGN_UP_REQUEST";
const SIGN_UP_REQUEST_SUCCESS = "auth/SIGN_UP_REQUEST_SUCCESS";
const SIGN_UP_REQUEST_FAILURE = "auth/SIGN_UP_REQUEST_FAILURE";

export const signUpRequest = createAction(SIGN_UP_REQUEST);
const signUpSuccess = createAction(SIGN_UP_REQUEST_SUCCESS, data => data);
const signUpFailure = createAction(SIGN_UP_REQUEST_FAILURE, error => error);

function* signUpSaga(action) {

  yield put(startLoading(SIGN_UP_REQUEST));
  try{
    yield delay(DELAY_TIME);
    const data = yield call(signUpApi, action.payload);
    yield put(signUpSuccess(data));
  }catch(e){
    yield put(signUpFailure(e));
  }finally{
    yield put(endLoading(SIGN_UP_REQUEST))
  }
}

/* 로그인 */
export const LOGIN_REQUEST = "auth/LOGIN_REQUEST";
export const LOGIN_REQUEST_SUCCESS = "auth/LOGIN_REQUEST_SUCCESS";
const LOGIN_REQUEST_FAILURE = "auth/LOGIN_REQUEST_FAILURE";

export const loginRequest = createAction(LOGIN_REQUEST);
const loginSuccess = createAction(LOGIN_REQUEST_SUCCESS, data => data);
const loginFailure = createAction(LOGIN_REQUEST_FAILURE, error => error);

function* loginSaga(action) {

  yield put(startLoading(LOGIN_REQUEST));
  try{
    yield delay(DELAY_TIME);
    const data = yield call(loginApi, action.payload);
    yield put(loginSuccess(data));
  }catch(e){
    yield put(loginFailure(e));
  }finally{
    yield put(endLoading(LOGIN_REQUEST))
  }
}
/* 로그아웃 */

export const LOGOUT_REQUEST = "auth/LOGOUT_REQUEST";
const LOGOUT_REQUEST_SUCCESS = "auth/LOGOUT_REQUEST_SUCCESS";
const LOGOUT_REQUEST_FAILURE = "auth/LOGOUT_REQUEST_FAILURE";

export const logoutRequest = createAction(LOGOUT_REQUEST);
const logoutSuccess = createAction(LOGOUT_REQUEST_SUCCESS, data => data);
const logoutFailure = createAction(LOGOUT_REQUEST_FAILURE, error => error);

function* logoutSaga(action) {

  yield put(startLoading(LOGOUT_REQUEST));
  try{
    yield delay(DELAY_TIME);
    const data = yield call(logoutApi, action.payload);
    yield put(logoutSuccess(data));
  }catch(e){
    yield put(logoutFailure(e));
  }finally{
    yield put(endLoading(LOGOUT_REQUEST));
  }
}


/* 토큰 유효성 검사 */
export const VALIDATE_TOKEN_REQUEST = "auth/VALIDATE_TOKEN_REQUEST";
const VALIDATE_TOKEN_SUCCESS = "auth/VALIDATE_TOKEN_SUCCESS";
const VALIDATE_TOKEN_FAILURE = "auth/VALIDATE_TOKEN_FAILURE";

export const validateTokenRequest = createAction(VALIDATE_TOKEN_REQUEST);
const validateTokenSuccess = createAction(VALIDATE_TOKEN_SUCCESS, response => response);
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

/**/

export function* authSaga() {
  yield takeLatest(SIGN_UP_REQUEST, signUpSaga);
  yield takeLatest(LOGIN_REQUEST, loginSaga);
  yield takeLatest(LOGOUT_REQUEST, logoutSaga);
  yield takeLatest(VALIDATE_TOKEN_REQUEST, validateTokenSaga);
}

const initialState = {
  isLoggedIn: false,
  member: {},
  error: null
}

const auth = handleActions({
  [SIGN_UP_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    member: action.payload.data,
    isLoggedIn: true,
    error: null
  }),
  [SIGN_UP_REQUEST_FAILURE]: (state, action) => ({
    ...state,
    isLoggedIn: false,
    error: action.payload
  }),
  
  [LOGIN_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    member: action.payload.data,
    isLoggedIn: true,
    error: null
  }),
  [LOGIN_REQUEST_FAILURE]: (state, action) => ({
    ...state,
    isLoggedIn: false,
    error: action.payload
  }),

  [LOGOUT_REQUEST_SUCCESS]: (state) => ({
    ...state,
    ...initialState
  }),
  [LOGOUT_REQUEST_FAILURE]: (state, action) => ({
    ...state,
    ...initialState,
    error: action.payload
  }),

  [VALIDATE_TOKEN_SUCCESS]: (state, action) => ({
    ...state,
    member: action.payload.data,
    isLoggedIn: true,
    error: null
  }),
  [VALIDATE_TOKEN_FAILURE]: (state, action) => ({
    ...state,
    isLoggedIn: false,
    member: {},
    error: action.payload
  }),
}, initialState)

export default auth;