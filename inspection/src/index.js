import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer, { rootSaga } from "./modules";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { BrowserRouter } from 'react-router-dom';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer, 
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)

sagaMiddleware.run(rootSaga);
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
  // <Provider store={store}>
  //   <BrowserRouter>
  //     <App />
  //   </BrowserRouter>
  // </Provider>
  ,document.getElementById('root')
);
