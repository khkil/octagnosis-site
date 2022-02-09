import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call, put, delay } from 'redux-saga/effects';
import { fetchInspectionDetailApi } from '../api/inspectionApi';
import { startLoading, endLoading } from './loading';

export const FETCH_INPECTION_DETAIL = 'inspection/FETCH_INPECTION_DETAIL';
const FETCH_INPECTION_DETAIL_SUCCESS =
  'inspection/FETCH_INPECTION_DETAIL_SUCCESS';
const FETCH_INPECTION_DETAIL_FAILURE =
  'inspection/FETCH_INPECTION_DETAIL_FAILURE';

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
    const { data } = yield call(fetchInspectionDetailApi, action.payload);
    yield put(fetchInspectionDetailSuccess(data));
  } catch (e) {
    console.error(e);
    yield put(fetchInspectionDetailFailure(e));
  } finally {
    yield put(endLoading(FETCH_INPECTION_DETAIL));
  }
}

export function* inspectionSaga() {
  yield takeLatest(FETCH_INPECTION_DETAIL, inpectionDetailSaga);
}

const initialState = {
  list: [],
  selected: {},
  error: null,
};

const inspection = handleActions(
  {
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
