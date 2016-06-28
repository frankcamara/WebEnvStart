import expect from 'expect';
import * as actions from './todoActions';
import * as constants from '../constants/actionTypes';
import thunk from 'redux-thunk';
import nock from 'nock';
import configuredMockStore from 'redux-mock-store';

const middleware = [thunk];
const mockStore = configuredMockStore(middleware);

describe('Todo async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should create LOAD_TODOS and LOAD_TODOS_SUCCESS when fetching todos', (done) => {
    // This is how you call nock to fake http calls
    // nock('http://template.com')
    // .get('/todos')
    // .reply(200, { body: {todos: [{id: 'one', title: 'one'}]}});

    // Arrange
    const expectedAction = {
      type: constants.LOAD_TODOS_SUCCESS,
      body: {todos: [{id: 'one', title: 'one'}]}
    };

    const store = mockStore({todos: []}, expectedAction);
    store.dispatch(actions.loadTodos()).then(() => {
      const storeActions = store.getActions();

      expect(storeActions[0].type).toEqual(constants.LOAD_TODOS);
      expect(storeActions[1].type).toEqual(constants.LOAD_TODOS_SUCCESS);
      expect(storeActions[1].todos.length).toEqual(3);
      done(); // Async complete
    });

  });
});
