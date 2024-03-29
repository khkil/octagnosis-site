import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call, put, delay } from 'redux-saga/effects';
import { startLoading, endLoading } from './loading';
import { DELAY_TIME } from '../utils/sagaUtil';
import {
  fetchInspectionDetailApi,
  fetchInspectionListApi,
} from '../api/inspectionApi';

export const FETCH_INPECTION_LIST_REQUEST = 'inspection/FETCH_INPECTION_LIST';
const FETCH_INPECTION_LIST_SUCCESS = 'inspection/FETCH_INPECTION_LIST_SUCCESS';
const FETCH_INPECTION_LIST_FAILURE = 'inspection/FETCH_INPECTION_LIST_FAILURE';

export const FETCH_INPECTION_DETAIL = 'inspection/FETCH_INPECTION_DETAIL';
const FETCH_INPECTION_DETAIL_SUCCESS =
  'inspection/FETCH_INPECTION_DETAIL_SUCCESS';
const FETCH_INPECTION_DETAIL_FAILURE =
  'inspection/FETCH_INPECTION_DETAIL_FAILURE';

export const fetchInspectionList = createAction(FETCH_INPECTION_LIST_REQUEST);
const fetchInspectionListSuccess = createAction(
  FETCH_INPECTION_LIST_SUCCESS,
  data => data,
);
const fetchInspectionListFailure = createAction(
  FETCH_INPECTION_LIST_FAILURE,
  e => e,
);

export const fetchInspectionDetail = createAction(FETCH_INPECTION_DETAIL);
const fetchInspectionDetailSuccess = createAction(
  FETCH_INPECTION_DETAIL_SUCCESS,
  data => data,
);
const fetchInspectionDetailFailure = createAction(
  FETCH_INPECTION_DETAIL_FAILURE,
  e => e,
);

function* inpectionDetailSaga(action) {
  yield put(startLoading(FETCH_INPECTION_DETAIL));
  try {
    yield delay(DELAY_TIME);
    const { data } = yield call(fetchInspectionDetailApi, action.payload);
    yield put(fetchInspectionDetailSuccess(data));
  } catch (e) {
    console.error(e);
    yield put(fetchInspectionDetailFailure(e));
  } finally {
    yield put(endLoading(FETCH_INPECTION_DETAIL));
  }
}

function* inpectionListSaga(action) {
  yield put(startLoading(FETCH_INPECTION_LIST_REQUEST));
  try {
    yield delay(DELAY_TIME);
    const { data } = yield call(fetchInspectionListApi, action.payload);
    yield put(fetchInspectionListSuccess(data));
  } catch (e) {
    console.error(e);
    yield put(fetchInspectionListFailure(e));
  } finally {
    yield put(endLoading(FETCH_INPECTION_LIST_REQUEST));
  }
}

export function* inspectionSaga() {
  yield takeLatest(FETCH_INPECTION_LIST_REQUEST, inpectionListSaga);
  yield takeLatest(FETCH_INPECTION_DETAIL, inpectionDetailSaga);
}

const initialState = {
  list: [],
  selected: {},
  error: null,
};

const inspection = handleActions(
  {
    [FETCH_INPECTION_LIST_SUCCESS]: (state, action) => ({
      ...state,
      list: action.payload,
    }),
    [FETCH_INPECTION_LIST_FAILURE]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
    [FETCH_INPECTION_DETAIL_SUCCESS]: (state, action) => ({
      ...state,
      selected: action.payload,
    }),
    [FETCH_INPECTION_DETAIL_FAILURE]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
  },
  initialState,
);

export default inspection;
