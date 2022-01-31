import { createAction, handleActions } from "redux-actions";
import { takeLatest, call, put, delay } from "redux-saga/effects";
import { memberListApi } from "../api/memberApi";
import { DELAY_TIME } from "../utils/sagaUtil";
import { startLoading, endLoading } from "./loading"

export const FETCH_MEMBER_LIST = "member/FETCH_MEMBER_LIST";
const FETCH_MEMBER_LIST_SUCCESS = "member/FETCH_MEMBER_LIST_SUCCESS";
const FETCH_MEMBER_LIST_FAILURE = "member/FETCH_MEMBER_LIST_FAILURE";

export const fetchMemberList = createAction(FETCH_MEMBER_LIST);
const fetchMemberListSuccess = createAction(FETCH_MEMBER_LIST_SUCCESS, data => data);
const fetchMemberListFailure = createAction(FETCH_MEMBER_LIST_FAILURE, error => error);

function* memberListSaga(action) {

  yield put(startLoading(FETCH_MEMBER_LIST));
  try{
    yield delay(DELAY_TIME);
    const { data } = yield call(memberListApi, action.payload);
    yield put(fetchMemberListSuccess(data));
  }catch(e){
    console.error(e);
    yield put(fetchMemberListFailure(e));
  }finally{
    yield put(endLoading(FETCH_MEMBER_LIST));
  }
}

const initialState = {
  list: [],
  selected: {},
  error: null
}


export function* memberSaga() {
  yield takeLatest(FETCH_MEMBER_LIST, memberListSaga);
}

const member = handleActions(
  {
    [FETCH_MEMBER_LIST_SUCCESS]: (state, action) => ({
      ...state,
      list: action.payload
    }),
    [FETCH_MEMBER_LIST_FAILURE]: (state, action) => ({
      ...state,
      error: action.payload
    }),
    
  },
  initialState
);

export default member;