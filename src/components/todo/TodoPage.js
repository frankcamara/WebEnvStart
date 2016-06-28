import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as todoActions from '../../actions/todoActions';
import toastr from 'toastr';

export class TodoPage extends React.Component {
  constructor (props, context) {
    super(props, context);

    this.state = {
      todo: Object.assign({}, props.todo),
      errors: {},
      applying: false
    };

    // Bind calls here instead of in the render, for better performance
    this.onUpdateTodo = this.onUpdateTodo.bind(this);
    this.onApplyTodo = this.onApplyTodo.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.todo.id !== nextProps.todo.id) {
      this.setState({todo: Object.assign({}, nextProps.todo)});
    }
  }

  onUpdateTodo (event) {
    const prop = event.target.name;
    let todo = this.state.todo;
    todo[prop] = event.target.value;
    return this.setState({todo: todo});
  }

  isValid () {
    let isvalid = true;
    let errors = {};

    if (this.state.todo.title.length < 1) {
      errors.title = 'Title is required';
      isvalid = false;
    }

    this.setState({errors: errors});
    return isvalid;
  }
  onApplyTodo (event) {
    event.preventDefault();

    if (!this.isValid()) {
      return;
    }

    this.setState({applying: true});
    this.props.actions.createTodo(this.state.todo).then(() => {
      this.setState({applying: false});
      toastr.success('Todo applied');
      this.context.router.push('/todos');
    }).catch(error => {
      toastr.error(error);
      this.setState({applying: false});
    });
  }

  render () {
    var style = {
      button: {
        float: 'right',
        marginTop: '5px',
        marginBottom: '20px'
      }
    }

    let titleError = this.state.errors.title;

    return (
      <div>
        <h2>Add Todo</h2>
        <input
          type="text"
          name="title"
          className="form-control"
          onChange={this.onUpdateTodo}
          value={this.state.todo.title} />
        {titleError && <div className="alert alert-danger">{titleError}</div>}
        <input
          type="button"
          style={style.button}
          className="btn btn-primary btn-block"
          disabled={this.state.applying}
          onClick={this.onApplyTodo}
          value={this.state.applying ? 'Updating...' : 'Apply'} />
      </div>
    );
  }
}

TodoPage.propTypes = {
  actions: PropTypes.object.isRequired,
  todo: PropTypes.object.isRequired
};

TodoPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps (state, ownProps) {
  let todoId = ownProps.params.id;
  let todo = {id: '', title: ''};

  if (todoId && state.todos.length > 0) {
    todo = state.todos.filter(todo => todo.id === todoId);
    todo = todo ? todo[0]: null;
  }

  return {
    todo: todo
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
export default connect(mapStateToProps, mapDipatchToProps)(TodoPage);
