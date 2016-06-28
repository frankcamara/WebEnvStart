const SIMULATED_RESPONSE_TIME = 0;

const todos = [
  {
    id: 'zero',
    title: 'zero'
  },
  {
    id: 'one',
    title: 'one'
  },
  {
    id: 'two',
    title: 'two'
  }
];

const createID = (todo) => {
  return todo.title.toLowerCase();
};

class TodoApi {

  static getAllTodos () {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(Object.assign([], todos));
      }, SIMULATED_RESPONSE_TIME);
    });
  }

  static saveTodo (todo) {
    todo = Object.assign({}, todo);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (todo.title.length < 1) {
          reject('Title is required');
        }

        if (todo.id) {
          let idx = todos.findIndex(t => t.id === todo.id);
          todos.splice(idx, 1, todo);
        } else {
          todo.id = createID(todo);
          todos.push(todo);
        }

        resolve(todo);
      }, SIMULATED_RESPONSE_TIME);
    });
  }

  static deleteTodo (todoId) {
    return new Promise(resolve => {
      setTimeout(() => {
        let idx = todos.findIndex(t => {t.id === todoId});
        todos.splice(idx,1);

        resolve();
      }, SIMULATED_RESPONSE_TIME);
    });
  }
}

export default TodoApi;
