import {combineReducers} from 'redux';
import todos from './todoReducer';
import apiCallCount from './apiCallReducer';

const rootReducer = combineReducers({
  todos: todos,
  apiCallCount: apiCallCount
});

export default rootReducer;
