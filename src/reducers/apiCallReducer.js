import * as constants from '../constants/actionTypes';

let initialState = {
  apiCallCount: 0
};

export default function (state = initialState.apiCallCount, action) {
  switch (action.type) {
  case constants.CREATE_TODO:
  case constants.LOAD_TODOS: {
    return state + 1
  }
  case constants.CREATE_TODO_SUCCESS:
  case constants.UPDATE_TODO_SUCCESS:
  case constants.LOAD_TODOS_SUCCESS: {
    return state - 1;
  }
  default: {
    return state;
  }
  }
}
