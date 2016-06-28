import * as constants from '../constants/actionTypes';

let initialState = {
  todos: []
};

export default function (state = initialState.todos, action) {
  switch (action.type) {
  case constants.CREATE_TODO_SUCCESS: {
    return [
      ...state,
      Object.assign({}, action.todo)
    ];
  }
  case constants.UPDATE_TODO_SUCCESS: {
    return [
      ...state.filter(todo => todo.id !== action.todo.id),
      Object.assign({}, action.todo)
    ];
  }
  case constants.LOAD_TODOS_SUCCESS: {
    return action.todos;
  }
  default: {
    return state;
  }
  }
}
