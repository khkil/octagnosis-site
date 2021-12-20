import { createAction, handleActions } from "redux-actions";
import { takeLatest, call, put, delay } from "redux-saga/effects";
import { fetchInspectionDetailApi, fetchInspectionListApi } from "../api/inspectionApi";
import { startLoading, endLoading } from "./loading"
import { DELAY_TIME } from "../utils/sagaUtil";

export const FETCH_INPECTION_LIST = "inspection/FETCH_INPECTION_LIST";
const FETCH_INPECTION_LIST_SUCCESS = "inspection/FETCH_INPECTION_LIST_SUCCESS";
const FETCH_INPECTION_LIST_FAILURE = "inspection/FETCH_INPECTION_LIST_FAILURE";

export const FETCH_INPECTION_DETAIL = "inspection/FETCH_INPECTION_DETAIL";
const FETCH_INPECTION_DETAIL_SUCCESS = "inspection/FETCH_INPECTION_DETAIL_SUCCESS";
const FETCH_INPECTION_DETAIL_FAILURE = "inspection/FETCH_INPECTION_DETAIL_FAILURE";

export const fetchInspectionList = createAction(FETCH_INPECTION_LIST);
export const fetchInspectionListSuccess = createAction(FETCH_INPECTION_LIST_SUCCESS, data => data);
export const fetchInspectionListFailure = createAction(FETCH_INPECTION_LIST_FAILURE, e => e);

export const fetchInspectionDetail = createAction(FETCH_INPECTION_DETAIL);
export const fetchInspectionDetailSuccess = createAction(FETCH_INPECTION_DETAIL_SUCCESS, data => data);
export const fetchInspectionDetailFailure = createAction(FETCH_INPECTION_DETAIL_FAILURE, e => e);


function* inpectionDetailSaga(action) {

  yield put(startLoading(FETCH_INPECTION_DETAIL));
  try{
    yield delay(DELAY_TIME);
    const { data } = yield call(fetchInspectionDetailApi, action.payload);
    yield put(fetchInspectionDetailSuccess(data));
    
  }catch(e){
    yield put(fetchInspectionDetailFailure(e));
    
  }finally{
    yield put(endLoading(FETCH_INPECTION_LIST))
  }
}


function* inpectionListSaga(action) {

  yield put(startLoading(FETCH_INPECTION_LIST));
  try{
    yield delay(DELAY_TIME);
    const { data } = yield call(fetchInspectionListApi, action.payload);
    yield put(fetchInspectionListSuccess(data));
    
  }catch(e){
    yield put(fetchInspectionListFailure(e));
    
  }finally{
    yield put(endLoading(FETCH_INPECTION_LIST))
  }
}

export function* inspectionSaga() {
  yield takeLatest(FETCH_INPECTION_LIST, inpectionListSaga);
  yield takeLatest(FETCH_INPECTION_DETAIL, inpectionDetailSaga);
}

const initialState = {
  list: [],
  selected: {},
  error: null
}

const inspection = handleActions({

  [FETCH_INPECTION_LIST_SUCCESS]: (state, action) => ({
    ...state,
    list: action.payload
  }),
  [FETCH_INPECTION_LIST_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload
  }),
  [FETCH_INPECTION_DETAIL_SUCCESS]: (state, action) => ({
    ...state,
    selected: action.payload
  }),
  [FETCH_INPECTION_DETAIL_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload
  }),

}, initialState );

export default inspection;