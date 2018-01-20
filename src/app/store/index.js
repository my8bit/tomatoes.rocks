import {settingsReducer, timerReducer, userReducer} from '../reducers';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {setSettings} from '../libs/firebase.auth';

const reducers = combineReducers({
  settingsReducer,
  timerReducer,
  userReducer
});

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // extension’s options like name, actionsBlacklist, actionsCreators...
    }) : compose;

const logger = ({getState}) => {
  return next => action => {
    // Call the next dispatch method in the middleware chain.
    const returnValue = next(action);
    if (returnValue) {
      const {
        settingsReducer: {settings},
        timerReducer: {startTime}
      } = getState();
      setSettings(settings, startTime);
    }

    // console.log('state after dispatch', getState());
    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue;
  };
};

const enhancer = composeEnhancers(
  applyMiddleware(logger),
  applyMiddleware(thunk)
);
export const store = createStore(reducers, enhancer);
