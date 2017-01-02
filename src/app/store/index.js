import {representationReducer} from '../reducers';
import {createStore, combineReducers} from 'redux';

const reducers = combineReducers({
  representationReducer
});
export const store = createStore(reducers);
