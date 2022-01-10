import { createAction, handleActions } from "redux-actions";
import { takeLatest, call, put, delay } from "redux-saga/effects";
import { startLoading, endLoading } from "./loading"
import { DELAY_TIME } from "../utils/sagaUtil";
import { memberProgressListApi } from "../api/memberApi";

export const FETCH_MEMBER_PROGRESS_LIST_REQUEST = "member/FETCH_MEMBER_PROGRESS_LIST_REQUEST";
export const CLEAR_MEMBER_PROGRESS_LIST = "member/CLEAR_MEMBER_PROGRESS_LIST";
const FETCH_MEMBER_PROGRESS_LIST_SUCCESS = "member/FETCH_MEMBER_PROGRESS_LIST_SUCCESS";
const FETCH_MEMBER_PROGRESS_LIST_FAILURE = "member/FETCH_MEMBER_PROGRESS_LIST_FAILURE";

export const fetchMemberProgressList = createAction(FETCH_MEMBER_PROGRESS_LIST_REQUEST);
export const clearMemberProgressList = createAction(CLEAR_MEMBER_PROGRESS_LIST);
const fetchMemberProgressListSuccess = createAction(FETCH_MEMBER_PROGRESS_LIST_SUCCESS, data => data);
const fetchMemberProgressListFailure = createAction(FETCH_MEMBER_PROGRESS_LIST_FAILURE, e => e);

function* memberProgressListSaga(action) {

  yield put(startLoading(FETCH_MEMBER_PROGRESS_LIST_REQUEST));
  try{
    yield delay(DELAY_TIME);
    const { data } = yield call(memberProgressListApi, action.payload);
    yield put(fetchMemberProgressListSuccess(data));
    
  }catch(e){
    console.error(e); 
    yield put(fetchMemberProgressListFailure(e));
    
  }finally{
    yield put(endLoading(FETCH_MEMBER_PROGRESS_LIST_REQUEST))
  }
}

export function* memberSaga() {
  yield takeLatest(FETCH_MEMBER_PROGRESS_LIST_REQUEST, memberProgressListSaga);
}
const initialState = {
  progressList: [],
  error: null
}

const member = handleActions({

  [FETCH_MEMBER_PROGRESS_LIST_SUCCESS]: (state, action) => ({
    ...state,
    progressList: action.payload
  }),
  [FETCH_MEMBER_PROGRESS_LIST_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload
  }),
  [CLEAR_MEMBER_PROGRESS_LIST]: (state, action) => ({
    ...state,
    progressList: []
  }),
 

}, initialState );

export default member;



