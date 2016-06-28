import expect from 'expect';
import React from 'react';
import {mount} from 'enzyme';
import {TodosPage} from './TodosPage';

function setup () {
  const props = {
    todos: [],
    actions: {}
  };

  return mount(<TodosPage {...props} />) // Mount is used to test components with children
}

describe('Todos page', () => {
  it('should render', () => {
    const wrapper = setup();
    expect(wrapper.find('h1').text()).toEqual('Todos');
  });
});
