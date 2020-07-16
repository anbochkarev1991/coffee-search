import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxSaga from 'redux-saga';
import { all } from 'redux-saga/effects';
import coffeeReducer from './reducers/coffee';
import coffeeSaga from './coffee-saga';

const sagaMiddleware = reduxSaga();

const storageState = window.localStorage.getItem('state');
const initialState = storageState ? JSON.parse(storageState) : undefined;

const store = createStore(
  combineReducers({
    coffee: coffeeReducer,
  }),
  initialState,
  composeWithDevTools(applyMiddleware(sagaMiddleware)),
);

sagaMiddleware.run(function* () {
  yield all([coffeeSaga()]);
});

store.subscribe(() => {
  const state = store.getState();
  window.localStorage.setItem('state', JSON.stringify(state));
});

export default store;