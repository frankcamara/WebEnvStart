import expect from 'expect';
import todoReducer from './todoReducer';
import * as constants from '../constants/actionTypes';

describe('Todo reducer', () => {
  it('should add todo when trigger CREATE_TODO_SUCCESS', () => {
    // Arrange
    const initialState = [
      {title: 'one'},
      {title: 'two'}
    ];
    const newTodo = {title: 'three'};

    const expectedAction = {
      type: constants.CREATE_TODO_SUCCESS,
      todo: newTodo
    }
    // Act
    const newState = todoReducer(initialState, expectedAction);
    // Assert
    expect(newState.length).toEqual(3);
  });

  it('should update todo when trigger UPDATE_TODO_SUCCESS', () => {
    // Arrange
    const initialState = [
      {id: 'one', title: 'one'},
      {id: 'two', title: 'two'},
      {id: 'three', title: 'three'}
    ];
    const todo = {id: 'three', title: 'newThree'};

    const expectedAction = {
      type: constants.UPDATE_TODO_SUCCESS,
      todo: todo
    }
    // Act
    const newState = todoReducer(initialState, expectedAction);
    const updatedTodo = newState.find(ns => ns.id === todo.id);
    const notUpdatedTodo = newState.find(ns => ns.id === 'one');
    // Assert
    expect(newState.length).toEqual(3); // State have the same amount of todos
    expect(updatedTodo.title).toEqual('newThree'); // Updated todo should have new title
    expect(notUpdatedTodo.title).toEqual('one'); // A non updated todo should have the same title
  });

  it('should load todos when trigger LOAD_TODOS_SUCCESS', () => {
    // Arrange
    const initialState = [];
    const todos = [
      {id: 'one', title: 'one'},
      {id: 'two', title: 'two'},
      {id: 'three', title: 'three'}
    ];

    const expectedAction = {
      type: constants.LOAD_TODOS_SUCCESS,
      todos: todos
    }
    // Act
    const newState = todoReducer(initialState, expectedAction);
    // Assert
    expect(newState.length).toEqual(3);
  });
});
