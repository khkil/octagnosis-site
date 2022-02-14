import { createAction, handleActions } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { questionListApi } from '../api/questionApi';
import { startLoading, endLoading } from './loading';

export const FETCH_QUESTION_LIST = 'inspection/FETCH_QUESTION_LIST';
const FETCH_QUESTION_LIST_SUCCESS = 'inspection/FETCH_QUESTION_LIST_SUCCESS';
const FETCH_QUESTION_LIST_FAILURE = 'inspection/FETCH_QUESTION_LIST_FAILURE';

export const fetchQuestionList = createAction(FETCH_QUESTION_LIST);
const fetchQuestionListSuccess = createAction(FETCH_QUESTION_LIST_SUCCESS, data => data);
const fetchQuestionListFailure = createAction(FETCH_QUESTION_LIST_FAILURE, e => e);

function* questionListSaga(action) {
  yield put(startLoading(FETCH_QUESTION_LIST));
  try {
    const { data } = yield call(questionListApi, action.payload);
    yield put(fetchQuestionListSuccess(data));
  } catch (e) {
    console.error(e);
    yield put(fetchQuestionListFailure(e));
  } finally {
    yield put(endLoading(FETCH_QUESTION_LIST));
  }
}

export function* questionSaga() {
  yield takeLatest(FETCH_QUESTION_LIST, questionListSaga);
}

const initialState = {
  list: [],
  selected: {},
  error: null,
};

const question = handleActions(
  {
    [FETCH_QUESTION_LIST_SUCCESS]: (state, action) => ({
      ...state,
      list: action.payload,
    }),
    [FETCH_QUESTION_LIST_FAILURE]: (state, action) => ({
      ...state,
      error: action.payload,
    }),
  },
  initialState,
);

export default question;
