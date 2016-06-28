import expect from 'expect';
import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import * as actions from '../actions/todoActions';
import nock from 'nock';

describe('Store', function () {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should handle creating todo', function () {
    // This is how you call nock to fake http calls
    // nock('http://template.com')
    // .get('/todos')
    // .reply(200, { body: {todos: [{id: 'one', title: 'one'}]}});

    // Arrange
    const store = createStore(rootReducer, {}, compose(applyMiddleware(thunk)));
    const addTodo = {
      id: '',
      title: 'four'
    };

    const updateTodo = {
      id: 'four',
      title: 'updatedFour'
    };

    // Act
    const populateAction = actions.loadTodos();
    const addAction = actions.createTodo(addTodo);
    const updateAction = actions.createTodo(updateTodo);

    store.dispatch(populateAction).then(() => {
      return store.dispatch(addAction);
    }).then(() => {
      return store.dispatch(updateAction);
    }).then(() => {
      // Assert
      const actual = store.getState().todos[0];
      const expected = {
        title: 'one'
      };
      expect(actual).toEqual(expected);
    });
  });
});
