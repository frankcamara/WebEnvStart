import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import HomePage from './components/home/HomePage';
import TodosPage from './components/todos/TodosPage';
import TodoPage from './components/todo/TodoPage';

const routes = (
  <Route component={App}>
    <Route path="/" component={HomePage} />
    <Route path="todos" component={TodosPage} />
    <Route path="todo" component={TodoPage} />
    <Route path="todo/:id" component={TodoPage} />
  </Route>
)

export default routes;
