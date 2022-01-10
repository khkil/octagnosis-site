import { createAction, handleActions } from "redux-actions";
import { takeLatest, call, put, delay } from "redux-saga/effects";
import { startLoading, endLoading } from "./loading"
import { DELAY_TIME } from "../utils/sagaUtil";
import { memberProgressListApi, memberProgressDetailApi } from "../api/memberApi";

export const CLEAR_MEMBER_PROGRESS = "member/CLEAR_MEMBER_PROGRESS";

export const clearMemberProgress = createAction(CLEAR_MEMBER_PROGRESS);

/*progress list */
export const FETCH_MEMBER_PROGRESS_LIST_REQUEST = "member/FETCH_MEMBER_PROGRESS_LIST_REQUEST";
const FETCH_MEMBER_PROGRESS_LIST_SUCCESS = "member/FETCH_MEMBER_PROGRESS_LIST_SUCCESS";
const FETCH_MEMBER_PROGRESS_LIST_FAILURE = "member/FETCH_MEMBER_PROGRESS_LIST_FAILURE";

export const fetchMemberProgressList = createAction(FETCH_MEMBER_PROGRESS_LIST_REQUEST);
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

/*progress detail  */

export const FETCH_MEMBER_PROGRESS_DETAIL_REQUEST = "member/FETCH_MEMBER_PROGRESS_DETAIL_REQUEST";
const FETCH_MEMBER_PROGRESS_DETAIL_SUCCESS = "member/FETCH_MEMBER_PROGRESS_DETAIL_SUCCESS";
const FETCH_MEMBER_PROGRESS_DETAIL_FAILURE = "member/FETCH_MEMBER_PROGRESS_DETAIL_FAILURE";

export const fetchMemberProgressDetail = createAction(FETCH_MEMBER_PROGRESS_DETAIL_REQUEST);
const fetchMemberProgressDetailSuccess = createAction(FETCH_MEMBER_PROGRESS_DETAIL_SUCCESS, data => data);
const fetchMemberProgressDetailFailure = createAction(FETCH_MEMBER_PROGRESS_DETAIL_FAILURE, e => e);

function* memberProgressDetailSaga(action) {

  yield put(startLoading(FETCH_MEMBER_PROGRESS_DETAIL_REQUEST));
  try{
    yield delay(DELAY_TIME);
    const { data } = yield call(memberProgressDetailApi, action.payload);
    yield put(fetchMemberProgressDetailSuccess(data));
    
  }catch(e){
    console.error(e); 
    yield put(fetchMemberProgressDetailFailure(e));
    
  }finally{
    yield put(endLoading(FETCH_MEMBER_PROGRESS_DETAIL_REQUEST))
  }
}

/** */

export function* memberSaga() {
  yield takeLatest(FETCH_MEMBER_PROGRESS_LIST_REQUEST, memberProgressListSaga);
  yield takeLatest(FETCH_MEMBER_PROGRESS_DETAIL_REQUEST, memberProgressDetailSaga);
}
const initialState = {
  progressList: [],
  progressDetail: {},
  error: null
}

const member = handleActions({
  [CLEAR_MEMBER_PROGRESS]: (state, action) => ({
    ...state,
    ...initialState
  }),
  [FETCH_MEMBER_PROGRESS_LIST_SUCCESS]: (state, action) => ({
    ...state,
    progressList: action.payload
  }),
  [FETCH_MEMBER_PROGRESS_LIST_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload
  }),
  [FETCH_MEMBER_PROGRESS_DETAIL_SUCCESS]: (state, action) => ({
    ...state,
    progressDetail: action.payload
  }),
  [FETCH_MEMBER_PROGRESS_DETAIL_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload
  }),
}, initialState );

export default member;



