import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import rootSaga from "../sagas/rootSaga";
import thunk from "redux-thunk";
import UserReducer from "../reducers/userReducer";

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  UserReducer,
  applyMiddleware(thunk, sagaMiddleware)
);

sagaMiddleware.run(rootSaga);
