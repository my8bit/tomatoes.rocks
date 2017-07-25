import {representationReducer, timerReducer, userReducer} from '../reducers';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  representationReducer,
  timerReducer,
  userReducer
});

// export const store = createStore(reducers, applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export const store = createStore(reducers, applyMiddleware(thunk));
