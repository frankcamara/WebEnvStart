import expect from 'expect';
import React from 'react';
import {mount} from 'enzyme';
import {TodoPage} from './TodoPage';

describe('Todo page', () => {
  it('should have an Apply button and give error when applying', () => {
    const props = {
      todo: { id: '', title: ''},
      applying: false,
      actions: {
        createTodo: () => { return Promise.resolve(); }
      }
    }
    const wrapper = mount(<TodoPage {...props} />);
    const applyBtn = wrapper.find('input').last();
    expect(applyBtn.prop('type')).toBe('button');

    expect(wrapper.state().applying).toBe(false);
    applyBtn.simulate('click');
    expect(wrapper.state().errors.title).toBe('Title is required');
  });
});
