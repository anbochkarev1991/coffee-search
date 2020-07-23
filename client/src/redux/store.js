import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxSaga from 'redux-saga';
import { all } from 'redux-saga/effects';
import coffeeSaga from './coffee-saga';
import coffeeReducer from './reducers/coffee';
import enterReducer from './reducers/enter-reducers';
import eventReducer from './reducers/eventsCafe-reducers';
import allEventsReducer from './reducers/events-reducers';
import menu from './reducers/menu-reducers';
import barista from './reducers/barista-reducers';

const sagaMiddleware = reduxSaga();

const storageState = window.localStorage.getItem('state');
const initialState = storageState ? JSON.parse(storageState) : undefined;

const store = createStore(
  combineReducers({
    coffee: coffeeReducer,
    enter: enterReducer,
    eventsCafe: eventReducer,
    events: allEventsReducer,
    menu: menu,
    barista: barista,
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
