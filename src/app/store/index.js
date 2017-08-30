import {representationReducer, timerReducer, userReducer} from '../reducers';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  representationReducer,
  timerReducer,
  userReducer
});

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // extension’s options like name, actionsBlacklist, actionsCreators...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
);
export const store = createStore(reducers, enhancer);
