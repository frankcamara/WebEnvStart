import React, {PropTypes} from 'react';
import TodoListItem from './TodoListItem';

const TodoList = ({todos: todos}) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
      {todos.map(todo =>
        <TodoListItem key={todo.id} todo={todo} />
      )}
      </tbody>
    </table>
  );
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired
};

export default TodoList;
