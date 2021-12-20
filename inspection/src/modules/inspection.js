import { createAction, handleActions } from "redux-actions";
import { takeLatest, call, put } from "redux-saga/effects";
import { fetchInspectionListApi } from "../api/inspectionApi";

import { startLoading, endLoading } from "./loading"

export const FETCH_INPECTION_LIST = "inspection/FETCH_INPECTION_LIST";
const FETCH_INPECTION_LIST_SUCCESS = "inspection/FETCH_INPECTION_LIST_SUCCESS";
const FETCH_INPECTION_LIST_FAILURE = "inspection/FETCH_INPECTION_LIST_FAILURE";

export const fetchInspectionList = createAction(FETCH_INPECTION_LIST);
export const fetchInspectionListSuccess = createAction(FETCH_INPECTION_LIST_SUCCESS, data => data);
export const fetchInspectionListFailure = createAction(FETCH_INPECTION_LIST_FAILURE, e => e);

function* inpectionListSaga(action) {

  yield put(startLoading(FETCH_INPECTION_LIST));
  try{
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

}, initialState );

export default inspection;