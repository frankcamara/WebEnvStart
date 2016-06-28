import * as constants from '../constants/actionTypes';
import todoAPI from '../api/mockTodoAPI';

export function createTodo (todo) {
  return function (dispatch) {
    dispatch({type: constants.CREATE_TODO});

    return todoAPI.saveTodo(todo).then(t => {
      const type = todo.id
        ? constants.UPDATE_TODO_SUCCESS
        : constants.CREATE_TODO_SUCCESS;

      dispatch({
        type: type,
        todo: t
      });
    }).catch(error => {
      dispatch({type: constants.CREATE_TODO_FAILED});
      throw error;
    });
  }
}

export function loadTodos () {
  return function (dispatch) {
    dispatch({type: constants.LOAD_TODOS});

    return todoAPI.getAllTodos().then(todos => {
      dispatch({
        type: constants.LOAD_TODOS_SUCCESS,
        todos: todos
      });
    }).catch(error => {
      dispatch({type: constants.LOAD_TODOS_FAILED});
      throw error;
    });
  }
}
