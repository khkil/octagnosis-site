import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call, put, delay } from 'redux-saga/effects';
import { resultListApi } from '../api/resultApi';
import { startLoading, endLoading } from './loading';

export const FETCH_RESULT_LIST = 'result/FETCH_RESULT_LIST';
const FETCH_RESULT_LIST_SUCCESS = 'result/FETCH_RESULT_LIST_SUCCESS';
const FETCH_RESULT_LIST_FAIL = 'result/FETCH_RESULT_LIST_FAIL';

export const fetchResultList = createAction(FETCH_RESULT_LIST);
const fetchResultListSuccess = createAction(FETCH_RESULT_LIST_SUCCESS, data => data);
const fetchResultListFailure = createAction(FETCH_RESULT_LIST_FAIL, e => e);

function* resultListSaga(action) {
  yield put(startLoading(FETCH_RESULT_LIST));
  try {
    const { data } = yield call(resultListApi, action.payload);
    yield put(fetchResultListSuccess(data));
  } catch (e) {
    console.error(e);
    yield put(fetchResultListFailure(e));
  } finally {
    yield put(endLoading(FETCH_RESULT_LIST));
  }
}

export function* resultSaga() {
  yield takeLatest(FETCH_RESULT_LIST, resultListSaga);
}

const initialState = {
  list: [],
  selected: {},
  error: null,
};

const result = handleActions(
  {
    [FETCH_RESULT_LIST_SUCCESS]: (state, action) => ({
      ...state,
      list: action.payload,
    }),
    [FETCH_RESULT_LIST_FAIL]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
  },
  initialState,
);

export default result;
