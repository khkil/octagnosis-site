import { createAction, handleActions } from "redux-actions";
import { takeLatest, call, put, delay } from "redux-saga/effects";
import { startLoading, endLoading } from "./loading"
import { DELAY_TIME } from "../utils/sagaUtil";
import { onePageQuestionFormApi } from "../api/questionApi";


/* 문항 리스트 */
export const ONE_PAGE_QUESTION_LIST_REQUEST = "question/ONE_PAGE_QUESTION_LIST_REQUEST";
const ONE_PAGE_QUESTION_LIST_REQUEST_SUCCESS = "question/QUESTION_LIST_REQUEST_SUCCESS";
const ONE_PAGE_QUESTION_LIST_REQUEST_FAILURE = "question/QUESTION_LIST_REQUEST_FAILURE";

export const onePageQuestionFormRequest = createAction(ONE_PAGE_QUESTION_LIST_REQUEST);
const onePageQuestionFormSuccess = createAction(ONE_PAGE_QUESTION_LIST_REQUEST_SUCCESS, response => response);
const onePageQuestionFormFailure = createAction(ONE_PAGE_QUESTION_LIST_REQUEST_FAILURE, error => error);

function* onePageQuestionSaga(action) {

  yield put(startLoading(ONE_PAGE_QUESTION_LIST_REQUEST));
  try{
    yield delay(DELAY_TIME);
    const response = yield call(onePageQuestionFormApi, action.payload);
    yield put(onePageQuestionFormSuccess(response));
  }catch(e){
    yield put(onePageQuestionFormFailure(e));
  }finally{
    yield put(endLoading(ONE_PAGE_QUESTION_LIST_REQUEST))
  }
}


export function* questionSaga(){
  yield takeLatest(ONE_PAGE_QUESTION_LIST_REQUEST, onePageQuestionSaga);
}

const initialState = {
  list: [],
  error: null
}

const question = handleActions({
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

