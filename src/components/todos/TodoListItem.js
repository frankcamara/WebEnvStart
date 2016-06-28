import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const TodoListItem = ({todo: todo}) => {
  return (
    <tr>
      <td><Link to={'/todo/' + todo.id}>{todo.title}</Link></td>
    </tr>
  );
};

TodoListItem.propTypes = {
  todo: PropTypes.object.isRequired
};

export default TodoListItem;
