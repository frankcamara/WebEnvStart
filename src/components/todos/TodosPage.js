import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as todoActions from '../../actions/todoActions';
import TodoList from './TodoList';

export class TodosPage extends React.Component {
  constructor (props, context) {
    super(props, context);

    this.onAddTodo = this.onAddTodo.bind(this);
  }

  onAddTodo () {
    this.context.router.push('/todo');
  }

  render () {
    const {todos} = this.props;

    return (
      <div className="jumbotron">
        <h1>Todos</h1>
        <TodoList todos={todos} />
        <input
          type="button"
          className="btn btn-primary"
          onClick={this.onAddTodo}
          value="Add Todo" />
      </div>
    );
  }
}

TodosPage.propTypes = {
  todos: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

TodosPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps (state) {
  return {
    todos: state.todos
  };
}

function mapDipatchToProps (dispatch) {
  return {
    actions: bindActionCreators(todoActions, dispatch)
  }
}

// When exporting a component that is decorated with connect function
// that create  a component that can interact with react-redux
// Container
export default connect(mapStateToProps, mapDipatchToProps)(TodosPage);
