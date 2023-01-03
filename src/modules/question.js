import { createAction, handleActions } from "redux-actions";
import { takeLatest, call, put, delay } from "redux-saga/effects";
import { startLoading, endLoading } from "./loading"
import { DELAY_TIME } from "../utils/sagaUtil";
import { onePageQuestionApi } from "../api/questionApi";

/* 공통 */
export const QUESTION_CLEAR = "question/QUESTION_CLEAR";

export const clearQuestion = createAction(QUESTION_CLEAR);
/* */

/* 1페이지 문항 */
export const ONE_PAGE_QUESTION_LIST_REQUEST = "question/ONE_PAGE_QUESTION_LIST_REQUEST";
const ONE_PAGE_QUESTION_LIST_REQUEST_SUCCESS = "question/QUESTION_LIST_REQUEST_SUCCESS";
const ONE_PAGE_QUESTION_LIST_REQUEST_FAILURE = "question/QUESTION_LIST_REQUEST_FAILURE";

export const onePageQuestionRequest = createAction(ONE_PAGE_QUESTION_LIST_REQUEST);

const onePageQuestionSuccess = createAction(ONE_PAGE_QUESTION_LIST_REQUEST_SUCCESS, response => response);
const onePageQuestionFailure = createAction(ONE_PAGE_QUESTION_LIST_REQUEST_FAILURE, error => error);


function* onePageQuestionSaga(action) {

  yield put(startLoading(ONE_PAGE_QUESTION_LIST_REQUEST));
  try{
    yield delay(DELAY_TIME);
    const response = yield call(onePageQuestionApi, action.payload);
    yield put(onePageQuestionSuccess(response));
  }catch(e){
    yield put(onePageQuestionFailure(e));
  }finally{
    yield put(endLoading(ONE_PAGE_QUESTION_LIST_REQUEST))
  }
}

/* */

export function* questionSaga(){
  yield takeLatest(ONE_PAGE_QUESTION_LIST_REQUEST, onePageQuestionSaga);
}

const initialState = {
  list: [],
  error: null
}

const question = handleActions({
  [QUESTION_CLEAR]: (state) => ({
    ...state,
    ...initialState
  }),
  [ONE_PAGE_QUESTION_LIST_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    list: action.payload
  }),
  [ONE_PAGE_QUESTION_LIST_REQUEST_FAILURE]: (state, action) => ({
    ...state,
    error: action.payload
  }),
}, initialState);

export default question;

